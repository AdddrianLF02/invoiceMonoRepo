import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  UseInterceptors,
  Inject,
  Res,
  UseGuards,
  Req,
  Logger,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CREATE_INVOICE_INPUT_TOKEN,
  GET_INVOICE_INPUT_TOKEN,
  DELETE_INVOICE_INPUT_TOKEN,
  UPDATE_INVOICE_INPUT_TOKEN,
  GET_CUSTOMER_INVOICES_INPUT_TOKEN,
  type CreateInvoiceInputPort,
  type GetInvoiceInputPort,
  type DeleteInvoiceInputPort,
  type UpdateInvoiceInputPort,
  type GetCustomerInvoicesInputPort,
} from '@repo/application';
import { CreateInvoiceSwaggerRequestDto } from './dtos';
import { InvoiceResponseSwaggerDto } from './dtos/response/invoice-swagger-response.dto';
import { UpdateInvoiceSwaggerRequestDto } from './dtos/request/update-invoice-swagger-request.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { InjectQueue } from '@nestjs/bullmq';
import { PDF_GENERATION_QUEUE } from '../pdf-generation/pdf-generation.module'; // <-- CORRECTO
import { Queue } from 'bullmq';
import { GeneratePdfRequestDto } from './dtos/request/generate-pdf-swagger-request.dto';


@ApiTags('Invoices')
@Controller('api/v1/invoices')
@ApiBearerAuth()
@UseGuards(AuthGuard)

export class InvoiceController {
  private readonly logger = new Logger(InvoiceController.name); // Logger para trazabilidad

  constructor(
    @Inject(CREATE_INVOICE_INPUT_TOKEN)
    private readonly createInvoiceUseCase: CreateInvoiceInputPort,
    @Inject(GET_INVOICE_INPUT_TOKEN)
    private readonly getInvoiceUseCase: GetInvoiceInputPort,
    @Inject(DELETE_INVOICE_INPUT_TOKEN)
    private readonly deleteInvoiceUseCase: DeleteInvoiceInputPort,
    @Inject(UPDATE_INVOICE_INPUT_TOKEN)
    private readonly updateInvoiceUseCase: UpdateInvoiceInputPort,
    @Inject(GET_CUSTOMER_INVOICES_INPUT_TOKEN)
    private readonly getCustomerInvoicesUseCase: GetCustomerInvoicesInputPort,
    @InjectQueue(PDF_GENERATION_QUEUE) 
    private readonly pdfQueue: Queue,
  ) {}

  // 🧾 CREATE
  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiBody({ type: CreateInvoiceSwaggerRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Factura creada exitosamente',
    type: InvoiceResponseSwaggerDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async create(@Body() dto: CreateInvoiceSwaggerRequestDto, @Req() req: any, @Res() _res: Response): Promise<void> {
    await this.createInvoiceUseCase.execute(req.user.sub, dto);
  }

  // 🔍 GET BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la factura (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Factura encontrada',
    type: InvoiceResponseSwaggerDto,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async findById(@Param('id', ParseUUIDPipe) id: string, @Res() _res: Response): Promise<void> {
    await this.getInvoiceUseCase.execute(id);
  }

  // 📦 GET BY CUSTOMER
  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener todas las facturas de un cliente' })
  @ApiParam({ name: 'customerId', description: 'ID del cliente (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de facturas del cliente',
    type: [InvoiceResponseSwaggerDto],
  })
  async findByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string, @Res() _res: Response): Promise<void> {
    await this.getCustomerInvoicesUseCase.execute(customerId);
  }

  // ✏️ UPDATE
  @Put(':id')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Actualizar una factura existente' })
  @ApiParam({ name: 'id', description: 'ID de la factura a actualizar (UUID)' })
  @ApiBody({ type: UpdateInvoiceSwaggerRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Factura actualizada con éxito',
    type: InvoiceResponseSwaggerDto,
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateInvoiceSwaggerRequestDto,
    @Res() _res: Response,
  ): Promise<void> {
    await this.updateInvoiceUseCase.execute(id, dto);
  }

  // ❌ DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura a eliminar (UUID)' })
  @ApiResponse({ status: 200, description: 'Factura eliminada con éxito' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() _res: Response): Promise<void> {
    await this.deleteInvoiceUseCase.execute(id);
  }

  @Post(':id/generate-pdf') // Define la ruta POST
  @HttpCode(HttpStatus.ACCEPTED) // Establece el código de estado HTTP a 202 Accepted
  @ApiOperation({ summary: 'Solicita la generación asíncrona de un PDF para una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura (UUID)', type: String })
  @ApiBody({ type: GeneratePdfRequestDto }) // Documenta el cuerpo esperado
  @ApiResponse({ status: 202, description: 'La solicitud de generación de PDF ha sido aceptada y encolada.', schema: { example: { jobId: '123' } } })
  @ApiResponse({ status: 400, description: 'Solicitud inválida (ej: ID no es UUID, templateName inválido).' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada (esto se validará en el worker).' }) // Nota: El controlador no verifica si la factura existe, eso lo hará el worker
  @ApiResponse({ status: 500, description: 'Error interno al añadir el trabajo a la cola.' })
  async requestPdfGeneration(
    @Param('id', ParseUUIDPipe) invoiceId: string, // Valida que el ID sea un UUID
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // Valida el DTO del cuerpo
    @Req() req: any,
    body: GeneratePdfRequestDto,
  ): Promise<{ jobId: string }> { // Devuelve el ID del trabajo encolado
    const userId = req.user.sub;
    if (!userId) {
      throw new InternalServerErrorException('No se pudo obtener el ID del usuario.');
    }
    const { templateName } = body;
    this.logger.log(`Solicitud recibida para generar PDF de factura ${invoiceId} con plantilla ${templateName}`);

    try {
      // Define los datos que necesita el worker
      const jobData = {
        invoiceId,
        templateName,
        userId
        // Podrías añadir aquí el ID del usuario que solicitó, si es necesario para permisos en el worker
        // userId: req.user.id // (Necesitarías inyectar @Req y obtener el usuario)
      };

      // Añade el trabajo a la cola 'pdf-generation'
      // El primer argumento es el *nombre* del tipo de trabajo (lo usará el Processor)
      const job = await this.pdfQueue.add('generate-invoice-pdf', jobData, {
         // Opciones específicas para este trabajo (opcional, sobrescriben los defaults)
         jobId: `pdf-${invoiceId}-${Date.now()}` // Genera un ID de trabajo predecible/único (opcional)
      });

      this.logger.log(`Trabajo de generación de PDF encolado con ID: ${job.id}`);

      // Devuelve el ID del trabajo al cliente
      return { jobId: job?.id || 'unknown' };

    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error al añadir trabajo de generación de PDF a la cola para factura ${invoiceId}: ${err.message}`, err.stack);
      // Lanza una excepción HTTP estándar si falla el encolado
      throw new InternalServerErrorException('No se pudo iniciar la generación del PDF. Inténtalo de nuevo más tarde.');
    }
  }
}

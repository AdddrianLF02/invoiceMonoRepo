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
  Inject,
  Res,
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
import { InjectQueue } from '@nestjs/bullmq';

import { Queue } from 'bullmq';
import { GeneratePdfRequestDto } from './dtos/request/generate-pdf-swagger-request.dto';
import { PDF_GENERATION_QUEUE } from 'src/pdf-generation/pdf-generation.token';


@ApiTags('Invoices')
@Controller('api/v1/invoices')
@ApiBearerAuth()

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

  @Post(':id/generate-pdf')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Solicita la generación asíncrona de un PDF para una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura (UUID)', type: String })
  @ApiBody({ type: GeneratePdfRequestDto }) // Documenta el cuerpo esperado
  @ApiResponse({ status: 202, description: 'Solicitud encolada' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 500, description: 'Error interno' })
  async requestPdfGeneration(
    @Param('id', ParseUUIDPipe) invoiceId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) 
    body: GeneratePdfRequestDto, // <-- Parámetro de body CORREGIDO
    @Req() req: any, // <-- @Req() viene DESPUÉS de @Body()
  ): Promise<{ jobId: string }> {

    // --- LÓGICA CORREGIDA ---
    // El AuthGuard pone el payload en req.user. El ID es req.user.sub
    const userId = req.user?.sub; 
    
    if (!userId) {
      // Este error ahora sí tiene sentido. Si el guardián fallara, nunca llegaría aquí.
      // Si llega aquí sin userId, es un problema de configuración.
      this.logger.error('Fallo crítico: El AuthGuard se ejecutó pero req.user.sub no está disponible.', req.user);
      throw new InternalServerErrorException('No se pudo obtener el ID del usuario desde el token.');
    }
    // --- FIN DE LA CORRECCIÓN ---

    const { templateName } = body;
    this.logger.log(`Solicitud recibida de [User: ${userId}] para generar PDF de factura ${invoiceId} con plantilla ${templateName}`);

    interface PdfJob {
      invoiceId: string;
      templateName: string;
      userId: string;
    }
    try {
      const jobData: PdfJob = { // Tipado fuerte
        invoiceId,
        templateName,
        userId: userId, // Pasamos el ID (string), no el objeto req.user
      };

      const job = await this.pdfQueue.add('generate-invoice-pdf', jobData, {
         jobId: `pdf-${invoiceId}-${userId}-${Date.now()}` // ID de trabajo único
      });

      this.logger.log(`Trabajo de generación de PDF encolado con ID: ${job.id}`);
      return { jobId: job.id as string };

    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error al añadir trabajo de generación de PDF a la cola para factura ${invoiceId}: ${err.message}`, err.stack);
      throw new InternalServerErrorException('No se pudo iniciar la generación del PDF. Inténtalo de nuevo más tarde.');
    }
  }
}

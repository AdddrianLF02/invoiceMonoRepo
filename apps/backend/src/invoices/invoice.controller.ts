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
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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


@ApiTags('Invoices')
@Controller('api/v1/invoices')

export class InvoiceController {
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
  async create(@Body() dto: CreateInvoiceSwaggerRequestDto, @Res() _res: Response): Promise<void> {
    await this.createInvoiceUseCase.execute(dto);
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
}

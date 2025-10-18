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
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import {
  InvoiceEntitySchema,
} from '@repo/core';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
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
import { InvoiceResponseSwaggerDto } from 'src/invoices/invoice-swagger.dto';

@ApiTags('Invoices')
@Controller('api/v1/invoices')
@UseInterceptors(new ZodSerializerInterceptor(InvoiceEntitySchema))
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

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({ status: 201, description: 'Factura creada exitosamente', type: InvoiceResponseSwaggerDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<void> {
    await this.createInvoiceUseCase.execute(createInvoiceDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la factura (UUID)' })
  @ApiResponse({ status: 200, description: 'Factura encontrada', type: InvoiceResponseSwaggerDto })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.getInvoiceUseCase.execute(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener todas las facturas de un cliente' })
  @ApiParam({ name: 'customerId', description: 'ID del cliente (UUID)' })
  @ApiResponse({ status: 200, description: 'Lista de facturas del cliente', type: [InvoiceResponseSwaggerDto] })
  async findByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string): Promise<void> {
    await this.getCustomerInvoicesUseCase.execute(customerId);
  }

  @Put(':id')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Actualizar una factura existente' })
  @ApiParam({ name: 'id', description: 'ID de la factura a actualizar (UUID)' })
  @ApiResponse({ status: 200, description: 'Factura actualizada con éxito', type: InvoiceResponseSwaggerDto })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<void> {
    await this.updateInvoiceUseCase.execute(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura a eliminar (UUID)' })
  @ApiResponse({ status: 200, description: 'Factura eliminada con éxito' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteInvoiceUseCase.execute(id);
  }
}

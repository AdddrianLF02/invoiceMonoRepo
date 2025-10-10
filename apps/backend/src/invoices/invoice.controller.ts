import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UsePipes, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ZodSerializerInterceptor, ZodValidationPipe } from "nestjs-zod";
import {
    InvoiceEntitySchema,
    Invoice
} from '@repo/core'
import {
    CreateInvoiceDto,
    GetInvoiceUseCase,
    DeleteInvoiceUseCase,
    UpdateInvoiceUseCase,
    GetCustomerInvoicesUseCase,
    CreateInvoiceUseCase,
    UpdateInvoiceDto,
    InvoiceResponseDto,
    GenericResponseDto
} from '@repo/application'

@ApiTags('Invoices') // Agrupa todos los endpoints en la UI de Swagger
@Controller('api/v1/invoices')
@UseInterceptors(new ZodSerializerInterceptor(InvoiceEntitySchema))
export class InvoiceController {
    constructor(
        private readonly createInvoiceUseCase: CreateInvoiceUseCase,
        private readonly getInvoiceUseCase: GetInvoiceUseCase,
        private readonly deleteInvoiceUseCase: DeleteInvoiceUseCase,
        private readonly updateInvoiceUseCase: UpdateInvoiceUseCase,
        private readonly getCustomerInvoicesUseCase: GetCustomerInvoicesUseCase,
    ) {}

    @Post()
    @UsePipes(ZodValidationPipe)
    @ApiOperation({ summary: 'Crear una nueva factura' })
    @ApiResponse({ status: 201, description: 'Factura creada exitosamente', type: GenericResponseDto })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<GenericResponseDto> {
        const invoiceId = await this.createInvoiceUseCase.execute(createInvoiceDto);
        return { id: invoiceId, message: 'Factura creada con éxito' };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una factura por su ID' })
    @ApiParam({ name: 'id', description: 'ID de la factura (UUID)' })
    @ApiResponse({ status: 200, description: 'Factura encontrada', type: InvoiceResponseDto })
    @ApiResponse({ status: 404, description: 'Factura no encontrada' })
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Invoice> {
        return await this.getInvoiceUseCase.execute(id);
    }

    @Get('customer/:customerId')
    @ApiOperation({ summary: 'Obtener todas las facturas de un cliente' })
    @ApiParam({ name: 'customerId', description: 'ID del cliente (UUID)' })
    @ApiResponse({ status: 200, description: 'Lista de facturas del cliente', type: [InvoiceResponseDto] })
    async findByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string): Promise<Invoice[]> {
        return await this.getCustomerInvoicesUseCase.execute(customerId);
    }

    @Put(':id')
    @UsePipes(ZodValidationPipe)
    @ApiOperation({ summary: 'Actualizar una factura existente' })
    @ApiParam({ name: 'id', description: 'ID de la factura a actualizar (UUID)' })
    @ApiResponse({ status: 200, description: 'Factura actualizada con éxito', type: GenericResponseDto })
    @ApiResponse({ status: 404, description: 'Factura no encontrada' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateInvoiceDto: UpdateInvoiceDto // Corregido el nombre del parámetro
    ): Promise<GenericResponseDto> {
        await this.updateInvoiceUseCase.execute(id, updateInvoiceDto);
        return { message: 'Factura actualizada con éxito' };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una factura' })
    @ApiParam({ name: 'id', description: 'ID de la factura a eliminar (UUID)' })
    @ApiResponse({ status: 200, description: 'Factura eliminada con éxito', type: GenericResponseDto })
    @ApiResponse({ status: 404, description: 'Factura no encontrada' })
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<GenericResponseDto> {
        await this.deleteInvoiceUseCase.execute(id);
        return { message: 'Factura eliminada con éxito' };
    }
}
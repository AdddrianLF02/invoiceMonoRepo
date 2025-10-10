import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import {
    Customer,
    CustomerEntitySchema,
} from '@repo/core'
import {
    CreateCustomerUseCase,
    GetCustomerByIdUseCase,
    GetCustomerByEmailUseCase,
    UpdateCustomerUseCase,
    CreateCustomerDto,
    CustomerResponseDto,
    UpdateCustomerDto
} from '@repo/application'

@ApiTags('Customers') // Agrupa los endpoints en Swagger
@Controller('api/v1/customers')
// Usamos el interceptor para transformar automáticamente la entidad 'Customer' en un DTO plano
@UseInterceptors(new ZodSerializerInterceptor(CustomerEntitySchema))
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly getCustomerByEmailUseCase: GetCustomerByEmailUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente', type: CustomerResponseDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'El email ya está en uso' })
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.createCustomerUseCase.execute(createCustomerDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente (UUID)' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    const customer = await this.getCustomerByIdUseCase.execute(id);
    if (!customer) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Obtener un cliente por su email' })
  @ApiParam({ name: 'email', description: 'Email del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findByEmail(@Param('email') email: string): Promise<Customer> {
    const customer = await this.getCustomerByEmailUseCase.execute(email);
    if (!customer) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Put(':id')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiParam({ name: 'id', description: 'ID del cliente a actualizar (UUID)' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.updateCustomerUseCase.execute({
      id,
      ...updateCustomerDto,
    });
  }
}
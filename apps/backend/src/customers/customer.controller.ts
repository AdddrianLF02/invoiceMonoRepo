import { Body, Controller, Get,   Inject, Param, ParseUUIDPipe, Post, Put, UseInterceptors, UsePipes, UseGuards, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import {
    CustomerEntitySchema,
} from '@repo/core'
import {
  CREATE_CUSTOMER_INPUT_TOKEN,
    CreateCustomerDto,
    CustomerResponseDto,
    GET_ALL_CUSTOMERS_INPUT_TOKEN,
    GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN,
    GET_CUSTOMER_BY_ID_INPUT_TOKEN,
    UPDATE_CUSTOMER_INPUT_TOKEN,
    UpdateCustomerDto
} from '@repo/application'
import type { CreateCustomerInputPort, GetAllCustomersInputPort, GetCustomerByEmailInputPort, GetCustomerByIdInputPort, UpdateCustomerInputPort } from '@repo/application/dist/types/use-cases/customer/ports/input-port';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateCustomerSwaggerRequestDto } from './dtos/request/create-customer-swagger-request.dto';

@ApiTags('Customers')
@Controller('api/v1/customers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(
    @Inject(CREATE_CUSTOMER_INPUT_TOKEN)
    private readonly createCustomerUseCase: CreateCustomerInputPort,
    
    @Inject(GET_CUSTOMER_BY_ID_INPUT_TOKEN)
    private readonly getCustomerByIdUseCase: GetCustomerByIdInputPort,
    
    @Inject(GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN)
    private readonly getCustomerByEmailUseCase: GetCustomerByEmailInputPort,
    
    @Inject(UPDATE_CUSTOMER_INPUT_TOKEN)
    private readonly updateCustomerUseCase: UpdateCustomerInputPort,

    @Inject(GET_ALL_CUSTOMERS_INPUT_TOKEN)
    private readonly getAllCustomersUseCase: GetAllCustomersInputPort,
  ) {}

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente', type: CustomerResponseDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'El email ya está en uso' })
  @ApiBody({ type: CreateCustomerSwaggerRequestDto })
  async create(@Body() dto: CreateCustomerDto, @Req() req: any, @Res() _res: Response): Promise<void> {
    await this.createCustomerUseCase.execute({ ...dto, userId: req.user.userId });
  }

  @Get('all')
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Clientes encontrados', type: [CustomerResponseDto] })
  async findAll(@Res() _res: Response): Promise<void> {
    await this.getAllCustomersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente (UUID)' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findById(@Param('id', ParseUUIDPipe) id: string, @Res() _res: Response): Promise<void> {
    await this.getCustomerByIdUseCase.execute(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Obtener un cliente por su email' })
  @ApiParam({ name: 'email', description: 'Email del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findByEmail(@Param('email') email: string, @Res() _res: Response): Promise<void> {
    await this.getCustomerByEmailUseCase.execute(email);
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
    @Body() dto: UpdateCustomerDto,
    @Res() _res: Response,
  ): Promise<void> {
    await this.updateCustomerUseCase.execute({ ...dto, id })
  }
}
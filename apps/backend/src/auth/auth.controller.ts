import { Controller, Post, Body, UsePipes, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod'
import {
  CREATE_USER_INPUT_TOKEN,
  VALIDATE_USER_INPUT_TOKEN,
  type CreateUserInputPort,
  type ValidateUserInputPort,
  CreateUserDto,
  LoginDto
  } from '@repo/application';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CREATE_USER_INPUT_TOKEN)
    private readonly createUserUseCase: CreateUserInputPort,
    
    @Inject(VALIDATE_USER_INPUT_TOKEN)
    private readonly validateUserUseCase: ValidateUserInputPort,
  ) {}

  @Post('register')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async register(@Body() createUserDto: CreateUserDto) {
    await this.createUserUseCase.execute(createUserDto);
    // No retornamos nada porque el presenter se encarga de la respuesta
  }

  @Post('login')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    await this.validateUserUseCase.execute(loginDto.email, loginDto.pass);
    // No retornamos nada porque el presenter se encarga de la respuesta
  }
}
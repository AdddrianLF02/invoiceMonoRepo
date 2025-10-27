import { Controller, Post, Body, UsePipes, Inject, Get, Request, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod'
import {
  CREATE_USER_INPUT_TOKEN,
  VALIDATE_USER_INPUT_TOKEN,
  GET_USER_PROFILE_INPUT_TOKEN,
  type CreateUserInputPort,
  type ValidateUserInputPort,
  CreateUserDto,
  LoginDto,
  type GetUserProfileInputPort
  } from '@repo/application';
import { Public } from './decorators/public.decorator';
// import { ResponseInterceptor } from '../shared/response.interceptor';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CREATE_USER_INPUT_TOKEN)
    private readonly createUserUseCase: CreateUserInputPort,
    
    @Inject(VALIDATE_USER_INPUT_TOKEN)
    private readonly validateUserUseCase: ValidateUserInputPort,

    @Inject(GET_USER_PROFILE_INPUT_TOKEN)
    private readonly getUserProfileUseCase: GetUserProfileInputPort,
  ) {}

  @Public()
  @Post('register')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async register(@Body() createUserDto: CreateUserDto, @Res() _res: Response) {
    await this.createUserUseCase.execute(createUserDto);
      // No retornamos nada porque el presenter se encarga de la respuesta
  }

  @Public()
  @Post('login')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto, @Res() _res: Response) {
    // El controlador solo orquesta, el presenter maneja la respuesta
    await this.validateUserUseCase.execute(loginDto.email, loginDto.pass);
    // Retornamos la respuesta que ya fue manejada por el presenter
    
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil de usuario' })
  @ApiResponse({ status: 200, description: 'Perfil de usuario obtenido con éxito' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getProfile(@Request() req, @Res() _res: Response) {
     // El payload del JWT establece el identificador del usuario en 'sub'
     await this.getUserProfileUseCase.execute(req.user.sub);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Renovar token de acceso usando refresh token' })
  @ApiResponse({ status: 200, description: 'Token renovado con éxito' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  async refreshToken(@Body() body: { refresh_token: string }, @Request() req) {
    // Esta funcionalidad se implementará en el use case correspondiente
    // Por ahora retornamos un placeholder
    return { message: 'Endpoint de refresh token implementado' };
  }
}
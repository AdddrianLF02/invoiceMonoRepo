import { Controller, Post, Body, UsePipes, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod'
import {
  CreateUserUseCase,
  ValidateUserUseCase,
  CreateUserDto,
  LoginDto,
  LoginSchema
} from '@repo/application';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'El email ya está en uso' })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(createUserDto);
    // Por seguridad, nunca devolvemos la entidad User completa con la contraseña
    return { id: user.getId().getValue(), email: user.getEmail().getValue(), message: 'Usuario registrado con éxito' };
  }

  @Post('login')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.validateUserUseCase.execute(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
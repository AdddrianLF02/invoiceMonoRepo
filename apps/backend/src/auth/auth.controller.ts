import { Controller, Post, Body, UsePipes, UnauthorizedException, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod'
import {
  CREATE_USER_INPUT_TOKEN,
  VALIDATE_USER_INPUT_TOKEN,
  CreateUserInputPort,
  ValidateUserInputPort,
  CreateUserDto,
  LoginDto,
  CreateUserOutputPort,
  ValidateUserOutputPort,
  CREATE_USER_OUTPUT_TOKEN,
  VALIDATE_USER_OUTPUT_TOKEN,
  SafeUser
  } from '@repo/application';
import { JwtService } from '@nestjs/jwt';
import { User } from '@repo/core';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController implements CreateUserOutputPort, ValidateUserOutputPort {
  private user: User | null = null;
  private safeUser: SafeUser | null = null;

  constructor(
    @Inject(CREATE_USER_INPUT_TOKEN)
    private readonly createUserUseCase: CreateUserInputPort,
    
    @Inject(VALIDATE_USER_INPUT_TOKEN)
    private readonly validateUserUseCase: ValidateUserInputPort,
    
    private readonly jwtService: JwtService
  ) {}

  present(result: User | SafeUser | null): void {
    if (result === null) {
      this.safeUser = null;
      return;
    }
    
    if ('toSafeObject' in result) {
      // Es un User
      this.user = result;
    } else {
      // Es un SafeUser
      this.safeUser = result;
    }
  }

  @Post('register')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'El email ya está en uso' })
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('Datos recibidos en /register:', createUserDto);
    await this.createUserUseCase.execute(createUserDto);
    
    if (!this.user) {
      throw new Error('Error al crear el usuario');
    }
    
    // Por seguridad, nunca devolvemos la entidad User completa con la contraseña
    return { 
      id: this.user.getId().getValue(), 
      email: this.user.getEmail().getValue(), 
      message: 'Usuario registrado con éxito' 
    };
  }

  @Post('login')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    await this.validateUserUseCase.execute(loginDto.email, loginDto.password);
    
    if (!this.safeUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: this.safeUser.id, email: this.safeUser.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      user: {
        id: this.safeUser.id,
        email: this.safeUser.email
      }
    }
  }
}
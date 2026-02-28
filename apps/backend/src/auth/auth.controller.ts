import { Controller, Post, Body, UsePipes, Inject, Get, Request, Res, UnauthorizedException, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { ResponseInterceptor } from '../shared/response.interceptor';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(CREATE_USER_INPUT_TOKEN)
    private readonly createUserUseCase: CreateUserInputPort,

    @Inject(VALIDATE_USER_INPUT_TOKEN)
    private readonly validateUserUseCase: ValidateUserInputPort,

    @Inject(GET_USER_PROFILE_INPUT_TOKEN)
    private readonly getUserProfileUseCase: GetUserProfileInputPort,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  @Public()
  @Post('register')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async register(@Body() createUserDto: CreateUserDto, @Res() _res: Response) {
    await this.createUserUseCase.execute(createUserDto);
  }

  @Public()
  @Post('login')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto, @Res() _res: Response) {
    await this.validateUserUseCase.execute(loginDto.email as string, loginDto.pass as string);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil de usuario' })
  @ApiResponse({ status: 200, description: 'Perfil de usuario obtenido con éxito' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getProfile(@Request() req, @Res() _res: Response) {
    await this.getUserProfileUseCase.execute(req.user.sub);
  }

  // ──────────────────────────────────────────────────────────────
  // REFRESH TOKEN — Stateless JWT (sin DB)
  //
  // ¿Por qué aquí y no en un UseCase?
  //   → No toca lógica de dominio. Es pura infraestructura de auth.
  //
  // ¿Por qué @Public()?
  //   → El access_token ya expiró, el AuthGuard lo rechazaría.
  //     Usamos el refresh_token como credencial alternativa.
  //
  // ¿Por qué un JWT_REFRESH_SECRET diferente?
  //   → Si alguien roba un access_token, no puede fabricar refresh tokens.
  //     Son firmas criptográficas independientes.
  // ──────────────────────────────────────────────────────────────
  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Renovar token de acceso usando refresh token' })
  @ApiBody({ schema: { properties: { refresh_token: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Nuevo access_token generado' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado' })
  async refreshToken(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token es requerido');
    }

    try {
      // 1. Verificar firma del refresh_token con su propio secret
      const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET')
        || 'una-clave-secreta-muy-segura-en-desarrollo-refresh';

      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: jwtRefreshSecret,
      });

      // 2. Extraer claims: solo necesitamos sub (userId) y email
      const { sub, email } = payload;

      // 3. Firmar nuevo access_token (15min) con JWT_SECRET
      const jwtSecret = this.configService.get<string>('JWT_SECRET')
        || 'una-clave-secreta-muy-segura-en-desarrollo';

      const newAccessToken = await this.jwtService.signAsync(
        { sub, email },
        { secret: jwtSecret, expiresIn: '15m' },
      );

      this.logger.log(`Token refreshed for user ${sub}`);

      return { access_token: newAccessToken };

    } catch (error) {
      this.logger.warn(`Refresh token inválido: ${(error as Error).message}`);
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
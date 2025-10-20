import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ApplicationModule } from 'src/modules/application.module';
import { CreateUserUseCase, ValidateUserUseCase } from '@repo/application';

@Module({
  imports: [
    ApplicationModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo',
      signOptions: { expiresIn: '60m' }, // El token expirará en 60 minutos
    }),
  ],
  controllers: [AuthController],
  providers: [
    CreateUserUseCase,
    ValidateUserUseCase
  ],
})
export class AuthModule {}


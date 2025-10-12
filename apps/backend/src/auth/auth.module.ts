import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { 
  CreateUserUseCase, 
  ValidateUserUseCase 
} from '@repo/application';
import { USER_REPOSITORY } from '@repo/core';
import { PrismaUserRepository } from '@repo/infrastructure';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo',
      signOptions: { expiresIn: '60m' }, // El token expirará en 60 minutos
    }),
  ],
  controllers: [AuthController],
  providers: [
    CreateUserUseCase,
    ValidateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}


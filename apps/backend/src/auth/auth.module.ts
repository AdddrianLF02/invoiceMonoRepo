import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ApplicattionModule } from 'src/modules/application.module';

@Module({
  imports: [
    ApplicattionModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo',
      signOptions: { expiresIn: '60m' }, // El token expirará en 60 minutos
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}


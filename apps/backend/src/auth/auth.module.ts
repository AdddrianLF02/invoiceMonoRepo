import { Module, Scope } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ApplicationModule } from 'src/modules/application.module';
import { 
  CreateUserUseCase, 
  ValidateUserUseCase,
  CREATE_USER_OUTPUT_TOKEN,
  VALIDATE_USER_OUTPUT_TOKEN,
  CREATE_USER_INPUT_TOKEN,
  VALIDATE_USER_INPUT_TOKEN
} from '@repo/application';
import { CreateUserPresenter } from './presenters/create-user.presenter';
import { ValidateUserPresenter } from './presenters/validate-user.presenter';
import { REQUEST } from '@nestjs/core';
import { JwtStrategy } from './strategies/jwt.strategy';

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
    JwtStrategy,
    // EXPRESS RESPONSE PARA PRESENTERS
    {
      provide: 'EXPRESS_RESPONSE',
      scope: Scope.REQUEST,
      useFactory: (req) => req.res,
      inject: [REQUEST]
    },
    // CREATE USER
    CreateUserUseCase,
    { provide: CREATE_USER_INPUT_TOKEN, useClass: CreateUserUseCase },
    { provide: CREATE_USER_OUTPUT_TOKEN, useClass: CreateUserPresenter },
    // VALIDATE USER
    ValidateUserUseCase,
    { provide: VALIDATE_USER_INPUT_TOKEN, useClass: ValidateUserUseCase },
    { provide: VALIDATE_USER_OUTPUT_TOKEN, useClass: ValidateUserPresenter }
  ],
})
export class AuthModule {}


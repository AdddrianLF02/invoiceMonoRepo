import { Module, Scope, Global } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

@Global()
@Module({
    imports: [
        ApplicationModule,
        PassportModule,
        // 👇 Use registerAsync to ensure ConfigService is ready
        JwtModule.registerAsync({
            imports: [ConfigModule], // Make sure ConfigModule is available
            inject: [ConfigService], // Inject ConfigService
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'una-clave-secreta-muy-segura-en-desarrollo', // Use ConfigService
                signOptions: { expiresIn: '60m' },
            }),
        }),
        ConfigModule, // Ensure ConfigModule is imported if not global
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        // ... (other providers remain the same)
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
    exports: [
        PassportModule,
        JwtModule,
        JwtStrategy
    ]
})
export class AuthModule {}
import { Module, Scope, Global } from '@nestjs/common';
import { USER_REPOSITORY, UNIT_OF_WORK } from '@repo/core';
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
    VALIDATE_USER_INPUT_TOKEN,
    GET_USER_PROFILE_INPUT_TOKEN,
    GetUserProfileUseCase,
    GET_USER_PROFILE_OUTPUT_TOKEN,
} from '@repo/application';
import { CreateUserPresenter } from './presenters/create-user.presenter';
import { ValidateUserPresenter } from './presenters/validate-user.presenter';
import { APP_GUARD, REQUEST } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { AuthGuard } from './guards/auth.guard';
import { GetProfileUserPresenter } from './presenters/get-profile-user.presenter';


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
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: 'EXPRESS_RESPONSE',
            scope: Scope.REQUEST,
            useFactory: (req) => req.res,
            inject: [REQUEST]
        },

        // CREATE USER
        {
            provide: CREATE_USER_INPUT_TOKEN,
            useFactory: (uow, output) => new CreateUserUseCase(uow, output),
            inject: [UNIT_OF_WORK, CREATE_USER_OUTPUT_TOKEN]
        },
        { provide: CREATE_USER_OUTPUT_TOKEN, useClass: CreateUserPresenter },
        // VALIDATE USER
        {
            provide: VALIDATE_USER_INPUT_TOKEN,
            useFactory: (repo, output) => new ValidateUserUseCase(repo, output),
            inject: [USER_REPOSITORY, VALIDATE_USER_OUTPUT_TOKEN]
        },
        { provide: VALIDATE_USER_OUTPUT_TOKEN, useClass: ValidateUserPresenter },
        // GET USER PROFILE
        {
            provide: GET_USER_PROFILE_INPUT_TOKEN,
            useFactory: (repo, output) => new GetUserProfileUseCase(repo, output),
            inject: [USER_REPOSITORY, GET_USER_PROFILE_OUTPUT_TOKEN]
        },
        { provide: GET_USER_PROFILE_OUTPUT_TOKEN, useClass: GetProfileUserPresenter },
    ],
    exports: [
        PassportModule,
        JwtModule,

    ]
})
export class AuthModule { }
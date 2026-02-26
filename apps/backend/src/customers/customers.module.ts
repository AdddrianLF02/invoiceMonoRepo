import { Module, Scope } from '@nestjs/common';
import { CUSTOMER_REPOSITORY, UNIT_OF_WORK } from '@repo/core';
import { ApplicationModule } from 'src/modules/application.module';
import { CustomerController } from './customer.controller';
import {
    CREATE_CUSTOMER_INPUT_TOKEN,
    CREATE_CUSTOMER_OUTPUT_TOKEN,
    CreateCustomerUseCase,
    GET_ALL_CUSTOMERS_INPUT_TOKEN,
    GET_ALL_CUSTOMERS_OUTPUT_TOKEN,
    GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN,
    GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN,
    GET_CUSTOMER_BY_ID_INPUT_TOKEN,
    GET_CUSTOMER_BY_ID_OUTPUT_TOKEN,
    GetAllCustomersUseCase,
    GetCustomerByEmailUseCase,
    GetCustomerByIdUseCase,
    UPDATE_CUSTOMER_INPUT_TOKEN,
    UPDATE_CUSTOMER_OUTPUT_TOKEN,
    UpdateCustomerUseCase
} from '@repo/application';
import { CreateCustomerPresenter } from './presenters/create-custom.presenter';
import { GetAllCustomersPresenter } from './presenters/get-all-customers.presenter';
import { GetCustomerByIdPresenter } from './presenters/get-customer-by-id.presenter';
import { GetCustomerByEmailPresenter } from './presenters/get-customer-by-email.presenter';
import { UpdateCustomerPresenter } from './presenters/update-customer.presenter';

@Module({
    imports: [ApplicationModule],
    controllers: [CustomerController],
    providers: [
        // EXPRESS RESPONSE PARA PRESENTER
        {
            provide: 'EXPRESS_RESPONSE',
            scope: Scope.REQUEST,
            useFactory: (req: any) => req.res,
            inject: ['REQUEST']
        },
        // CREATE 
        {
            provide: CREATE_CUSTOMER_INPUT_TOKEN,
            useFactory: (uow, output) => new CreateCustomerUseCase(uow, output),
            inject: [UNIT_OF_WORK, CREATE_CUSTOMER_OUTPUT_TOKEN]
        },
        { provide: CREATE_CUSTOMER_OUTPUT_TOKEN, useClass: CreateCustomerPresenter },
        // UPDATE
        {
            provide: UPDATE_CUSTOMER_INPUT_TOKEN,
            useFactory: (uow, output) => new UpdateCustomerUseCase(uow, output),
            inject: [UNIT_OF_WORK, UPDATE_CUSTOMER_OUTPUT_TOKEN]
        },
        { provide: UPDATE_CUSTOMER_OUTPUT_TOKEN, useClass: UpdateCustomerPresenter },
        // GET BY EMAIL
        {
            provide: GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN,
            useFactory: (repo, output) => new GetCustomerByEmailUseCase(repo, output),
            inject: [CUSTOMER_REPOSITORY, GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN]
        },
        { provide: GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN, useClass: GetCustomerByEmailPresenter },
        // GET BY ID
        {
            provide: GET_CUSTOMER_BY_ID_INPUT_TOKEN,
            useFactory: (repo, output) => new GetCustomerByIdUseCase(repo, output),
            inject: [CUSTOMER_REPOSITORY, GET_CUSTOMER_BY_ID_OUTPUT_TOKEN]
        },
        { provide: GET_CUSTOMER_BY_ID_OUTPUT_TOKEN, useClass: GetCustomerByIdPresenter },
        // GET ALL
        {
            provide: GET_ALL_CUSTOMERS_INPUT_TOKEN,
            useFactory: (uow, output) => new GetAllCustomersUseCase(uow, output),
            inject: [UNIT_OF_WORK, GET_ALL_CUSTOMERS_OUTPUT_TOKEN]
        },
        { provide: GET_ALL_CUSTOMERS_OUTPUT_TOKEN, useClass: GetAllCustomersPresenter }
    ]
})

export class CustomersModule { }

import { Module, Scope } from '@nestjs/common';
import { ApplicationModule } from 'src/modules/application.module';
import { CustomerController } from './customer.controller';
import { CREATE_CUSTOMER_INPUT_TOKEN, CREATE_CUSTOMER_OUTPUT_TOKEN, CreateCustomerUseCase, GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN, GET_CUSTOMER_BY_ID_INPUT_TOKEN, GetCustomerByEmailUseCase, GetCustomerByIdUseCase, UPDATE_INVOICE_INPUT_TOKEN, UpdateCustomerUseCase } from '@repo/application';
import { CreateCustomerPresenter } from './presenters/create-custom.presenter';

@Module({
    imports: [ApplicationModule],
    controllers: [CustomerController],
    providers: [
        // EXPRESS RESPONSE PARA PRESENTER
        {
            provide: 'EXPRESS_RESPONSE',
            scope: Scope.REQUEST,
            useFactory: (context: any) => context.switchToHttp().getResponse(),
            inject: []
        },
        // CREATE 
        { provide: CREATE_CUSTOMER_INPUT_TOKEN, useClass: CreateCustomerUseCase },
        { provide: CREATE_CUSTOMER_OUTPUT_TOKEN, useClass: CreateCustomerPresenter },
        { provide: UPDATE_INVOICE_INPUT_TOKEN, useClass: UpdateCustomerUseCase },
        { provide: GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN, useClass: GetCustomerByEmailUseCase },
        { provide: GET_CUSTOMER_BY_ID_INPUT_TOKEN, useClass: GetCustomerByIdUseCase }
    ]
})

export class CustomersModule {}

import { Module, Scope } from '@nestjs/common';
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
            useFactory: (context: any) => context.switchToHttp().getResponse(),
            inject: []
        },
        // CREATE 
        { provide: CREATE_CUSTOMER_INPUT_TOKEN, useClass: CreateCustomerUseCase },
        { provide: CREATE_CUSTOMER_OUTPUT_TOKEN, useClass: CreateCustomerPresenter },
        // UPDATE
        { provide: UPDATE_CUSTOMER_INPUT_TOKEN, useClass: UpdateCustomerUseCase },
        { provide: UPDATE_CUSTOMER_OUTPUT_TOKEN, useClass: UpdateCustomerPresenter },
        // GET BY EMAIL
        { provide: GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN, useClass: GetCustomerByEmailUseCase },
        { provide: GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN, useClass: GetCustomerByEmailPresenter },
        // GET BY ID
        { provide: GET_CUSTOMER_BY_ID_INPUT_TOKEN, useClass: GetCustomerByIdUseCase },
        { provide: GET_CUSTOMER_BY_ID_OUTPUT_TOKEN, useClass: GetCustomerByIdPresenter },
        // GET ALL
        { provide: GET_ALL_CUSTOMERS_INPUT_TOKEN, useClass: GetAllCustomersUseCase },
        { provide: GET_ALL_CUSTOMERS_OUTPUT_TOKEN, useClass: GetAllCustomersPresenter }
    ]
})

export class CustomersModule {}

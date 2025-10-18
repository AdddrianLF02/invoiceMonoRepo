import { Module, Scope } from '@nestjs/common';
import { ApplicattionModule } from 'src/modules/application.module';
import { InvoiceController } from './invoice.controller';
import { InfrastructureModule } from 'src/modules/infrastructure.module';
import { CreateInvoicePresenter } from './presenters/create-invoice.presenter';
import { CREATE_INVOICE_INPUT_TOKEN, CREATE_INVOICE_OUTPUT_TOKEN, CreateInvoiceUseCase, DELETE_INVOICE_INPUT_TOKEN, DeleteInvoiceUseCase, GET_CUSTOMER_INVOICES_INPUT_TOKEN, GET_CUSTOMER_INVOICES_OUTPUT_TOKEN, GET_INVOICE_INPUT_TOKEN, GetCustomerInvoicesUseCase, GetInvoiceUseCase, UPDATE_INVOICE_INPUT_TOKEN, UpdateInvoiceUseCase } from '@repo/application';
import { GetCustomerInvoicesPresenter } from './presenters/get-customer-invoices.presenter';
import { GetInvoicePresenter } from './presenters/get-invoice.presenter';
import { DeleteInvoicePresenter } from './presenters/delete-invoice.presenter';
import { UpdateInvoicePresenter } from './presenters/update-invoice.presenter';

@Module({
    // Necesitamos el ApplicationModule para Use Cases y el InfrastructureModule para UoW/Repos
    imports: [ApplicattionModule, InfrastructureModule],
    controllers: [InvoiceController],
    providers: [
        // Custom Provider para el objeto Response (scope por request)
        {
          provide: 'EXPRESS_RESPONSE',
          scope: Scope.REQUEST,
          useFactory: (context: any) => {
            // context es un ExecutionContext en tiempo de ejecución
            // Nest lo resuelve internamente con `HttpArgumentsHost`
            const http = context.switchToHttp();
            return http.getResponse()
          } ,
          inject: [/** nest inyectará el contexto automáticamente */] 
        },
         // --- CREATE ---
    {
      provide: CREATE_INVOICE_INPUT_TOKEN,
      useClass: CreateInvoiceUseCase,
    },
    {
      provide: CREATE_INVOICE_OUTPUT_TOKEN,
      useClass: CreateInvoicePresenter,
      scope: Scope.REQUEST,
    },

    // --- UPDATE ---
    {
      provide: UPDATE_INVOICE_INPUT_TOKEN,
      useClass: UpdateInvoiceUseCase,
    },
    {
      provide: UPDATE_INVOICE_INPUT_TOKEN,
      useClass: UpdateInvoicePresenter,
      scope: Scope.REQUEST,
    },

    // --- DELETE ---
    {
      provide: DELETE_INVOICE_INPUT_TOKEN,
      useClass: DeleteInvoiceUseCase,
    },
    {
      provide: DELETE_INVOICE_INPUT_TOKEN,
      useClass: DeleteInvoicePresenter,
      scope: Scope.REQUEST,
    },

    // --- GET ONE ---
    {
      provide: GET_INVOICE_INPUT_TOKEN,
      useClass: GetInvoiceUseCase,
    },
    {
      provide: GET_INVOICE_INPUT_TOKEN,
      useClass: GetInvoicePresenter,
      scope: Scope.REQUEST,
    },

    // --- GET BY CUSTOMER ---
    {
      provide: GET_CUSTOMER_INVOICES_INPUT_TOKEN,
      useClass: GetCustomerInvoicesUseCase,
    },
    {
      provide: GET_CUSTOMER_INVOICES_OUTPUT_TOKEN,
      useClass: GetCustomerInvoicesPresenter,
      scope: Scope.REQUEST,
    },
    ]
})

export class InvoicesModule {}

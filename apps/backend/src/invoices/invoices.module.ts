import { Module, Scope } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import {
  CREATE_INVOICE_INPUT_TOKEN,
  CREATE_INVOICE_OUTPUT_TOKEN,
  DELETE_INVOICE_INPUT_TOKEN,
  DELETE_INVOICE_OUTPUT_TOKEN,
  GET_CUSTOMER_INVOICES_INPUT_TOKEN,
  GET_CUSTOMER_INVOICES_OUTPUT_TOKEN,
  GET_INVOICE_INPUT_TOKEN,
  GET_INVOICE_OUTPUT_TOKEN,
  UPDATE_INVOICE_INPUT_TOKEN,
  UPDATE_INVOICE_OUTPUT_TOKEN,
  CreateInvoiceUseCase,
  DeleteInvoiceUseCase,
  GetCustomerInvoicesUseCase,
  GetInvoiceUseCase,
  UpdateInvoiceUseCase,
} from '@repo/application';

import { CreateInvoicePresenter } from './presenters/create-invoice.presenter';
import { DeleteInvoicePresenter } from './presenters/delete-invoice.presenter';
import { GetInvoicePresenter } from './presenters/get-invoice.presenter';
import { GetCustomerInvoicesPresenter } from './presenters/get-customer-invoices.presenter';
import { UpdateInvoicePresenter } from './presenters/update-invoice.presenter';

import { InfrastructureModule } from 'src/modules/infrastructure.module';
import { ApplicattionModule } from 'src/modules/application.module';


@Module({
  imports: [
    // Importa donde se define UNIT_OF_WORK y TAX_CALCULATION_STRATEGY
    InfrastructureModule,
    ApplicattionModule,
  ],
  controllers: [InvoiceController],
  providers: [
    /**
     * Bind de la Response (por request)
     */
    {
      provide: 'EXPRESS_RESPONSE',
      scope: Scope.REQUEST,
      useFactory: (context: any) => {
        const http = context.switchToHttp();
        return http.getResponse();
      },
      inject: [],
    },

    /**
     * --- CREATE ---
     */
    {
      provide: CREATE_INVOICE_INPUT_TOKEN,
      useClass: CreateInvoiceUseCase,
    },
    {
      provide: CREATE_INVOICE_OUTPUT_TOKEN,
      useClass: CreateInvoicePresenter,
      scope: Scope.REQUEST,
    },

    /**
     * --- UPDATE ---
     */
    {
      provide: UPDATE_INVOICE_INPUT_TOKEN,
      useClass: UpdateInvoiceUseCase,
    },
    {
      provide: UPDATE_INVOICE_OUTPUT_TOKEN,
      useClass: UpdateInvoicePresenter,
      scope: Scope.REQUEST,
    },

    /**
     * --- DELETE ---
     */
    {
      provide: DELETE_INVOICE_INPUT_TOKEN,
      useClass: DeleteInvoiceUseCase,
    },
    {
      provide: DELETE_INVOICE_OUTPUT_TOKEN,
      useClass: DeleteInvoicePresenter,
      scope: Scope.REQUEST,
    },

    /**
     * --- GET ONE ---
     */
    {
      provide: GET_INVOICE_INPUT_TOKEN,
      useClass: GetInvoiceUseCase,
    },
    {
      provide: GET_INVOICE_OUTPUT_TOKEN,
      useClass: GetInvoicePresenter,
      scope: Scope.REQUEST,
    },

    /**
     * --- GET BY CUSTOMER ---
     */
    {
      provide: GET_CUSTOMER_INVOICES_INPUT_TOKEN,
      useClass: GetCustomerInvoicesUseCase,
    },
    {
      provide: GET_CUSTOMER_INVOICES_OUTPUT_TOKEN,
      useClass: GetCustomerInvoicesPresenter,
      scope: Scope.REQUEST,
    },
  ],
  exports: [],
})
export class InvoicesModule {}

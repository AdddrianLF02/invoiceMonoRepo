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
import { ApplicationModule } from 'src/modules/application.module';
import { HttpAdapterHost, REQUEST } from '@nestjs/core';
import type { Response } from 'express';


@Module({
  imports: [
    InfrastructureModule,
    ApplicationModule,
  ],
  controllers: [InvoiceController],
  providers: [
    // ✅ Vincula Response de Express por request
    {
  provide: 'EXPRESS_RESPONSE',
  scope: Scope.REQUEST,
  useFactory: (req: Request): Response => {
    const res = (req as any).res as Response | undefined;
    if (!res) {
      throw new Error('No Express Response object found in Request.');
    }
    return res;
  },
  inject: [REQUEST],
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
      provide: UPDATE_INVOICE_OUTPUT_TOKEN,
      useClass: UpdateInvoicePresenter,
      scope: Scope.REQUEST,
    },

    // --- DELETE ---
    {
      provide: DELETE_INVOICE_INPUT_TOKEN,
      useClass: DeleteInvoiceUseCase,
    },
    {
      provide: DELETE_INVOICE_OUTPUT_TOKEN,
      useClass: DeleteInvoicePresenter,
      scope: Scope.REQUEST,
    },

    // --- GET ONE ---
    {
      provide: GET_INVOICE_INPUT_TOKEN,
      useClass: GetInvoiceUseCase,
    },
    {
      provide: GET_INVOICE_OUTPUT_TOKEN,
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
  ],
})
export class InvoicesModule {}

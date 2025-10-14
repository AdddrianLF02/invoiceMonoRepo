import { Inject, Injectable } from '@nestjs/common';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  CustomerId,
  Invoice
} from '@repo/core'
import { GetCustomerInvoicesInputPort } from './ports/input-port';

@Injectable()
export class GetCustomerInvoicesUseCase implements GetCustomerInvoicesInputPort {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(customerId: string): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.findByCustomerId(
      CustomerId.fromString(customerId)
    );
    
    return invoices
  }
}
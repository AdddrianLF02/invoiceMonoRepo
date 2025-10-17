import { Inject, Injectable } from '@nestjs/common';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  CustomerId,
} from '@repo/core'
import { GetCustomerInvoicesInputPort } from './ports/input-port';
import { GET_CUSTOMER_INVOICES_OUTPUT_TOKEN, type GetCustomerInvoicesOutputPort } from './ports/output-port';

@Injectable()
export class GetCustomerInvoicesUseCase implements GetCustomerInvoicesInputPort {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(GET_CUSTOMER_INVOICES_OUTPUT_TOKEN)
    private readonly outputPort: GetCustomerInvoicesOutputPort
  ) {}

  async execute(customerId: string): Promise<void> {
    const invoices = await this.invoiceRepository.findByCustomerId(
      CustomerId.fromString(customerId)
    );
    
    this.outputPort.present(invoices)
  }
}
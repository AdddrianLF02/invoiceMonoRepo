// GetCustomerInvoicesUseCase (Clean Architecture)
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  CustomerId,
} from '@repo/core'
import { GetCustomerInvoicesInputPort } from './ports/input-port';
import { GET_CUSTOMER_INVOICES_OUTPUT_TOKEN, type GetCustomerInvoicesOutputPort } from './ports/output-port';

export class GetCustomerInvoicesUseCase implements GetCustomerInvoicesInputPort {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly outputPort: GetCustomerInvoicesOutputPort
  ) { }

  async execute(customerId: string): Promise<void> {
    const invoices = await this.invoiceRepository.findByCustomerId(
      CustomerId.fromString(customerId)
    );

    this.outputPort.present(invoices)
  }
}
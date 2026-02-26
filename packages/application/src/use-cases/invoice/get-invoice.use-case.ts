// GetInvoiceUseCase (Clean Architecture)
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  InvoiceId
} from '@repo/core'
import { GetInvoiceInputPort } from './ports/input-port';
import { GET_INVOICE_OUTPUT_TOKEN, type GetInvoiceOutPutPort } from './ports/output-port';

export class GetInvoiceUseCase implements GetInvoiceInputPort {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly outputPort: GetInvoiceOutPutPort
  ) { }

  async execute(id: string): Promise<void> {
    const invoice = await this.invoiceRepository.findById(InvoiceId.fromString(id));

    if (!invoice) {
      throw new Error(`NOT_FOUND: Invoice with ID ${id} not found`);
    }

    this.outputPort.present(invoice)
  }
}
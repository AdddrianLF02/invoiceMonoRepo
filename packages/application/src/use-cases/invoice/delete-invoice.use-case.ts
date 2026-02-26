// DeleteInvoiceUseCase (Clean Architecture)
import {
  type InvoiceRepository,
  INVOICE_REPOSITORY,
  InvoiceId
} from '@repo/core'
import { DeleteInvoiceInputPort } from './ports/input-port';
import { DELETE_INVOICE_OUTPUT_TOKEN, type DeleteInvoiceOutputPort } from './ports/output-port';

export class DeleteInvoiceUseCase implements DeleteInvoiceInputPort {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly outputPort: DeleteInvoiceOutputPort
  ) { }

  async execute(id: string): Promise<void> {
    // Verificar que la factura existe
    const invoice = await this.invoiceRepository.findById(InvoiceId.fromString(id));

    if (!invoice) {
      throw new Error(`NOT_FOUND: Invoice with ID ${id} not found`);
    }

    // Eliminar la factura
    await this.invoiceRepository.delete(InvoiceId.fromString(id));

    this.outputPort.present(id);
  }
}
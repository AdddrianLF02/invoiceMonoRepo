import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type InvoiceRepository,
  INVOICE_REPOSITORY,
  InvoiceId
} from '@repo/core'
import { DeleteInvoiceInputPort } from './ports/input-port';
import { DELETE_INVOICE_OUTPUT_TOKEN, type DeleteInvoiceOutputPort } from './ports/output-port';

@Injectable()
export class DeleteInvoiceUseCase implements DeleteInvoiceInputPort {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(DELETE_INVOICE_OUTPUT_TOKEN)
    private readonly outputPort: DeleteInvoiceOutputPort
  ) {}

  async execute(id: string): Promise<void> {
    // Verificar que la factura existe
    const invoice = await this.invoiceRepository.findById(InvoiceId.fromString(id));
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    // Eliminar la factura
    await this.invoiceRepository.delete(InvoiceId.fromString(id));

    this.outputPort.present(id);
  }
}
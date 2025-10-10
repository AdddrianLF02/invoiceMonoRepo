import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type InvoiceRepository,
  INVOICE_REPOSITORY,
  InvoiceId
} from '@repo/core'

@Injectable()
export class DeleteInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Verificar que la factura existe
    const invoice = await this.invoiceRepository.findById(InvoiceId.fromString(id));
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    // Eliminar la factura
    await this.invoiceRepository.delete(InvoiceId.fromString(id));
  }
}
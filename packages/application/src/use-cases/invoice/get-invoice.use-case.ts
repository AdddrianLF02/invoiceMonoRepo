import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  Invoice,
  InvoiceId
} from '@repo/core'

@Injectable()
export class GetInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(InvoiceId.fromString(id));
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice
  }
}
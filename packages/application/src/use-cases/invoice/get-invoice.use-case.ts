import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  Invoice,
  InvoiceId
} from '@repo/core'
import { GetInvoiceInputPort } from './ports/input-port';
import { type GetInvoiceOutPut, OUTPUT_TOKEN } from './ports/output-port';

@Injectable()
export class GetInvoiceUseCase implements GetInvoiceInputPort {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(OUTPUT_TOKEN)
    private readonly outputPort: GetInvoiceOutPut
  ) {}

  async execute(id: string): Promise<void> {
    const invoice = await this.invoiceRepository.findById(InvoiceId.fromString(id));
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    this.outputPort.present(invoice)
  }
}
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  Invoice,
  InvoiceId,
  CustomerId,
  Money,
  InvoiceStatus,
  InvoiceItem,
  TAX_CALCULATION_STRATEGY,
  type ITaxCalculationStrategy
} from '@repo/core'
import {
  UpdateInvoiceDto 
} from '../../dtos/invoice.zod'
import {
  type UpdateInvoiceOutputPort,
  UPDATE_INVOICE_OUTPUT_TOKEN
} from './ports/output-port'

@Injectable()
export class UpdateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(TAX_CALCULATION_STRATEGY)
    private readonly taxCalculationStrategy: ITaxCalculationStrategy,
    @Inject(UPDATE_INVOICE_OUTPUT_TOKEN)
    private readonly outputPort: UpdateInvoiceOutputPort
  ) {}

  async execute(id: string, input: UpdateInvoiceDto): Promise<void> {
    let invoice: Invoice | null = await this.invoiceRepository.findById(InvoiceId.fromString(id));
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    const currentInvoice = invoice;

    const updateStrategies = {
      customerId: (val: string) => currentInvoice.updateCustomerId(CustomerId.fromString(val)),
      status: (val: string) => currentInvoice.updateStatus(InvoiceStatus.fromString(val)),
      issueDate: (val: Date) => currentInvoice.updateIssueDate(val),
      dueDate: (val: Date) => currentInvoice.updateDueDate(val),
    };

    for (const key of Object.keys(input) as Array<keyof UpdateInvoiceDto>) {
      if (key in updateStrategies) {
        const strategy = updateStrategies[key as keyof typeof updateStrategies];
        const value = input[key];
        if (strategy && value !== undefined) {
          invoice = strategy(value as any);
        }
      }
    }

    if (input.items) {
      invoice = invoice.clearItems();
      for (const itemDto of input.items) {
        const unitPrice = Money.fromFloat(itemDto.unitPrice, 'EUR');
        const calculated = this.taxCalculationStrategy.calculate({
          unitPrice,
          quantity: itemDto.quantity,
          taxRate: itemDto.taxRate,
        });
        const item = InvoiceItem.create(
          itemDto.description,
          itemDto.quantity,
          unitPrice,
          itemDto.taxRate,
          calculated.subtotal,
          calculated.taxAmount,
          calculated.total
        );
        invoice = invoice.addItem(item);
      }
    }

    const updatedInvoice = await this.invoiceRepository.update(invoice);

    // ✅ aquí notificamos al Presenter (output port)
    this.outputPort.present(updatedInvoice);
  }
}

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

    // Estrategias de actualización basadas en el estado actual del agregado (inmutables)
    const updateStrategies = {
      customerId: (inv: Invoice, val: string) => inv.updateCustomerId(CustomerId.fromString(val)),
      status: (inv: Invoice, val: string) => {
        // Usamos los métodos de dominio para respetar las invariantes de negocio
        switch (val) {
          case 'PAID':
            return inv.markAsPaid();
          case 'PENDING':
            return inv.markAsPending();
          case 'CANCELLED':
            return inv.cancel();
          case 'OVERDUE':
            return inv.markAsOverdue();
          case 'DRAFT':
            // Vuelta a borrador (poco habitual). Si se permite, usamos updateStatus directo.
            return inv.updateStatus(InvoiceStatus.fromString(val));
          default:
            return inv.updateStatus(InvoiceStatus.fromString(val));
        }
      },
      issueDate: (inv: Invoice, val: Date) => inv.updateIssueDate(val),
      dueDate: (inv: Invoice, val: Date) => inv.updateDueDate(val),
    } as const;

    for (const key of Object.keys(input) as Array<keyof UpdateInvoiceDto>) {
      const value = input[key];
      if (value === undefined) continue;
      const strategy = updateStrategies[key as keyof typeof updateStrategies];
      if (strategy) {
        invoice = strategy(invoice!, value as any);
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

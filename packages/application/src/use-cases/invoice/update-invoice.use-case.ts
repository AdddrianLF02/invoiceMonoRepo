import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
  Invoice,
  InvoiceId,
  CustomerId,
  Money,
  InvoiceStatus,
  InvoiceItem
} from '@repo/core'
import {
  UpdateInvoiceDto 
} from '@repo/application'

@Injectable()
export class UpdateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(id: string, input: UpdateInvoiceDto): Promise<Invoice> {
    // 1. La comprobación de 'NotFound' actúa como un type guard.
    // TypeScript sabe que después de esta línea, 'invoice' no puede ser null.
    let invoice: Invoice | null = await this.invoiceRepository.findById(InvoiceId.fromString(id));
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    // Creamos una constante. En este punto, TypeScript sabe 100% que no es nula.
    const currentInvoice = invoice;

    // 2. Definimos las estrategias con tipos explícitos, ¡adiós 'any'!
    const updateStrategies = {
      customerId: (val: string) => currentInvoice.updateCustomerId(CustomerId.fromString(val)),
      status: (val: string) => currentInvoice.updateStatus(InvoiceStatus.fromString(val)),
      issueDate: (val: Date) => currentInvoice.updateIssueDate(val),
      dueDate: (val: Date) => currentInvoice.updateDueDate(val),
    };

    // 3. Iteramos y aplicamos las estrategias, reasignando la nueva instancia inmutable.
    for (const key of Object.keys(input) as Array<keyof UpdateInvoiceDto>) {
      if (key in updateStrategies) {
        const strategy = updateStrategies[key as keyof typeof updateStrategies];
        const value = input[key];
        if (strategy && value !== undefined) {
          invoice = strategy(value as any); // Usamos 'as any' aquí de forma controlada porque TypeScript no puede inferir el tipo dinámico
        }
      }
    }

    // Manejo especial para 'items'
    if (input.items) {
      invoice = invoice.clearItems();
      for (const itemDto of input.items) {
        const item = InvoiceItem.create(
          itemDto.description,
          itemDto.quantity,
          Money.create(itemDto.unitPrice, 'EUR'),
          itemDto.taxRate,
        );
        invoice = invoice.addItem(item);

      }
    }

    return this.invoiceRepository.update(invoice);
  }
}
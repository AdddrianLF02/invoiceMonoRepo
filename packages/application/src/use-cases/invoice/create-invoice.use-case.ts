import { Inject, Injectable } from '@nestjs/common';
import { 
  CustomerId, 
  InvoiceItem, 
  Invoice, 
  Money,
  type InvoiceRepository,
  INVOICE_REPOSITORY
} from '@repo/core';
import { CreateInvoiceDto } from '@repo/application';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(input: CreateInvoiceDto): Promise<string> {
    // Convertir los items del DTO a entidades de dominio
    const items = input.items.map(item => 
      InvoiceItem.create(
        item.description,
        item.quantity,
        Money.create(item.unitPrice, 'EUR'), // Asumimos EUR como moneda por defecto
        item.taxRate
      )
    );

    // Crear la factura
    const invoice = Invoice.create(
      CustomerId.fromString(input.customerId),
      new Date(input.issueDate),
      new Date(input.dueDate),
      items
    );

    // Guardar la factura
    await this.invoiceRepository.create(invoice);

    // Devolver el ID de la factura creada
    return invoice.getId().toString();
  }
}
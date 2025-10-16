import { Inject, Injectable } from '@nestjs/common';
import { 
  CustomerId, 
  InvoiceItem, 
  Invoice, 
  Money,
  type InvoiceRepository,
  type ITaxCalculationStrategy,
  TAX_CALCULATION_STRATEGY,
  INVOICE_REPOSITORY
} from '@repo/core';
import { CreateInvoiceDto } from '../../dtos/invoice.zod';
import { CreateInvoiceInputPort } from './ports/input-port';
import { OUTPUT_TOKEN, type CreateInvoiceOutputPort } from './ports/output-port';

@Injectable()
export class CreateInvoiceUseCase implements CreateInvoiceInputPort {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(TAX_CALCULATION_STRATEGY)
    private readonly taxCalculationStrategy: ITaxCalculationStrategy,
    @Inject(OUTPUT_TOKEN)
    private readonly outputPort: CreateInvoiceOutputPort
  ) {}

  async execute(input: CreateInvoiceDto): Promise<void> {
      // 1. Mapear y Calcular los ítems (Strategy)
      const items = input.items.map(itemDto => {
      const unitPrice = Money.fromFloat(itemDto.unitPrice, 'EUR');
      const calculatedResults = this.taxCalculationStrategy.calculate({
        unitPrice,
        quantity: itemDto.quantity,
        taxRate: itemDto.taxRate
      });

        // 1.3 Crear la entidad de dominio InvoiceItem con los valores fijos
        return InvoiceItem.create(
          itemDto.description,
          itemDto.quantity,
          unitPrice,
          itemDto.taxRate,
          // Valores calculados por la Strategy
          calculatedResults.subtotal,
          calculatedResults.taxAmount,
          calculatedResults.total
        );
      });

      // 2. Crear y guardar la factura (Domain layer)
      const invoice = Invoice.create(
        CustomerId.fromString(input.customerId),
        new Date(input.issueDate),
        new Date(input.dueDate),
        items
      );

      await this.invoiceRepository.create(invoice);

      this.outputPort.present(invoice);
  }
}
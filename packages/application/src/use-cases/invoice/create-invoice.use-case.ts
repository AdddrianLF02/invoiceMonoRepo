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
import { CreateInvoiceDto } from '../../dtos/invoice/invoice.zod';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(TAX_CALCULATION_STRATEGY)
    private readonly taxCalculationStrategy: ITaxCalculationStrategy,
  ) {}

  async execute(input: CreateInvoiceDto): Promise<string> {
      // 1. Mapear y Calcular los ítems (Strategy)
      const items = input.items.map(itemDto => {
        // 1.1 Crear VO de precio unitario (usando fromFloat para entrada de usuario)
        const unitPrice = Money.fromFloat(itemDto.unitPrice, 'EUR');

        // 1.2 Obtener los valores de cálculo usando la Strategy injectada
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

      return invoice.getId().toString();
  }
}
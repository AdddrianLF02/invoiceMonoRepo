// CreateInvoiceUseCase (Clean Architecture)
import {
  CustomerId,
  InvoiceItem,
  Invoice,
  Money,
  type ITaxCalculationStrategy,
  TAX_CALCULATION_STRATEGY,
  UNIT_OF_WORK,
  type IUnitOfWork,
  UserId
} from '@repo/core';
import { CreateInvoiceDto } from '../../dtos/invoice.zod';
import { CreateInvoiceInputPort } from './ports/input-port';
import { CREATE_INVOICE_OUTPUT_TOKEN, type CreateInvoiceOutputPort } from './ports/output-port';
export class CreateInvoiceUseCase implements CreateInvoiceInputPort {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly taxCalculationStrategy: ITaxCalculationStrategy,
    private readonly outputPort: CreateInvoiceOutputPort
  ) { }

  async execute(userId: string, input: CreateInvoiceDto): Promise<void> {
    console.log('[CreateInvoiceUseCase] Input recibido:', input);

    // Envolvemos la lógica de negocio en la transacción
    await this.uow.executeTransaction(async () => {
      console.log('[CreateInvoiceUseCase] Entrando en transacción');
      const repo = this.uow.invoiceRepository;
      console.log('[CreateInvoiceUseCase] Repo:', !!repo);

      // 0. Validar ownership del customerId respecto al usuario autenticado
      const ownerId = UserId.fromString(userId);
      const customersOfUser = await this.uow.customerRepository.findByUserId(ownerId);
      const requestedCustomerId = CustomerId.fromString(input.customerId as string);
      const customerBelongsToUser = customersOfUser.some(c => c.getId().equals(requestedCustomerId));
      if (!customerBelongsToUser) {
        throw new Error('FORBIDDEN: El cliente no pertenece al usuario autenticado');
      }

      // 1. Mapear y Calcular los ítems (Strategy)
      const items = (input.items as any[]).map(itemDto => {
        console.log('[CreateInvoiceUseCase] Mapeando ítem:', itemDto);
        const unitPrice = Money.fromFloat(itemDto.unitPrice as number, 'EUR');
        const calc = this.taxCalculationStrategy.calculate({
          unitPrice,
          quantity: itemDto.quantity as number,
          taxRate: itemDto.taxRate as number
        });

        // 1.3 Crear la entidad de dominio InvoiceItem con los valores fijos
        return InvoiceItem.create(
          itemDto.description as string,
          itemDto.quantity as number,
          unitPrice,
          itemDto.taxRate as number,
          // Valores calculados por la Strategy
          calc.subtotal,
          calc.taxAmount,
          calc.total
        );
      });

      // 2. Crear y guardar la factura (Domain layer)
      const invoice = Invoice.create(
        requestedCustomerId,
        new Date(input.issueDate as string),
        new Date(input.dueDate as string),
        items
      );
      console.log('[CreateInvoiceUseCase] Factura creada:', invoice);

      await repo.create(invoice);
      console.log('[CreateInvoiceUseCase] Factura guardada en repositorio');

      this.outputPort.present(invoice);
    })
  }
}
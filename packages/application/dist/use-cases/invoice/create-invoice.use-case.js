"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceUseCase = void 0;
// CreateInvoiceUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class CreateInvoiceUseCase {
    uow;
    taxCalculationStrategy;
    outputPort;
    constructor(uow, taxCalculationStrategy, outputPort) {
        this.uow = uow;
        this.taxCalculationStrategy = taxCalculationStrategy;
        this.outputPort = outputPort;
    }
    async execute(userId, input) {
        console.log('[CreateInvoiceUseCase] Input recibido:', input);
        // Envolvemos la lógica de negocio en la transacción
        await this.uow.executeTransaction(async () => {
            console.log('[CreateInvoiceUseCase] Entrando en transacción');
            const repo = this.uow.invoiceRepository;
            console.log('[CreateInvoiceUseCase] Repo:', !!repo);
            // 0. Validar ownership del customerId respecto al usuario autenticado
            const ownerId = core_1.UserId.fromString(userId);
            const customersOfUser = await this.uow.customerRepository.findByUserId(ownerId);
            const requestedCustomerId = core_1.CustomerId.fromString(input.customerId);
            const customerBelongsToUser = customersOfUser.some(c => c.getId().equals(requestedCustomerId));
            if (!customerBelongsToUser) {
                throw new Error('FORBIDDEN: El cliente no pertenece al usuario autenticado');
            }
            // 1. Mapear y Calcular los ítems (Strategy)
            const items = input.items.map(itemDto => {
                console.log('[CreateInvoiceUseCase] Mapeando ítem:', itemDto);
                const unitPrice = core_1.Money.fromFloat(itemDto.unitPrice, 'EUR');
                const calc = this.taxCalculationStrategy.calculate({
                    unitPrice,
                    quantity: itemDto.quantity,
                    taxRate: itemDto.taxRate
                });
                // 1.3 Crear la entidad de dominio InvoiceItem con los valores fijos
                return core_1.InvoiceItem.create(itemDto.description, itemDto.quantity, unitPrice, itemDto.taxRate, 
                // Valores calculados por la Strategy
                calc.subtotal, calc.taxAmount, calc.total);
            });
            // 2. Crear y guardar la factura (Domain layer)
            const invoice = core_1.Invoice.create(requestedCustomerId, new Date(input.issueDate), new Date(input.dueDate), items);
            console.log('[CreateInvoiceUseCase] Factura creada:', invoice);
            await repo.create(invoice);
            console.log('[CreateInvoiceUseCase] Factura guardada en repositorio');
            this.outputPort.present(invoice);
        });
    }
}
exports.CreateInvoiceUseCase = CreateInvoiceUseCase;
//# sourceMappingURL=create-invoice.use-case.js.map
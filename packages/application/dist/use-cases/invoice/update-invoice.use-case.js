"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceUseCase = void 0;
// UpdateInvoiceUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class UpdateInvoiceUseCase {
    invoiceRepository;
    taxCalculationStrategy;
    outputPort;
    constructor(invoiceRepository, taxCalculationStrategy, outputPort) {
        this.invoiceRepository = invoiceRepository;
        this.taxCalculationStrategy = taxCalculationStrategy;
        this.outputPort = outputPort;
    }
    async execute(id, input) {
        let invoice = await this.invoiceRepository.findById(core_1.InvoiceId.fromString(id));
        if (!invoice) {
            throw new Error(`NOT_FOUND: Invoice with ID ${id} not found`);
        }
        // Estrategias de actualización basadas en el estado actual del agregado (inmutables)
        const updateStrategies = {
            customerId: (inv, val) => inv.updateCustomerId(core_1.CustomerId.fromString(val)),
            status: (inv, val) => {
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
                        return inv.updateStatus(core_1.InvoiceStatus.fromString(val));
                    default:
                        return inv.updateStatus(core_1.InvoiceStatus.fromString(val));
                }
            },
            issueDate: (inv, val) => inv.updateIssueDate(val),
            dueDate: (inv, val) => inv.updateDueDate(val),
        };
        for (const key of Object.keys(input)) {
            const value = input[key];
            if (value === undefined)
                continue;
            const strategy = updateStrategies[key];
            if (strategy) {
                invoice = strategy(invoice, value);
            }
        }
        if (input.items) {
            invoice = invoice.clearItems();
            for (const itemDto of input.items) {
                const unitPrice = core_1.Money.fromFloat(itemDto.unitPrice, 'EUR');
                const calculated = this.taxCalculationStrategy.calculate({
                    unitPrice,
                    quantity: itemDto.quantity,
                    taxRate: itemDto.taxRate,
                });
                const item = core_1.InvoiceItem.create(itemDto.description, itemDto.quantity, unitPrice, itemDto.taxRate, calculated.subtotal, calculated.taxAmount, calculated.total);
                invoice = invoice.addItem(item);
            }
        }
        const updatedInvoice = await this.invoiceRepository.update(invoice);
        // ✅ aquí notificamos al Presenter (output port)
        this.outputPort.present(updatedInvoice);
    }
}
exports.UpdateInvoiceUseCase = UpdateInvoiceUseCase;
//# sourceMappingURL=update-invoice.use-case.js.map
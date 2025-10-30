"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const output_port_1 = require("./ports/output-port");
let UpdateInvoiceUseCase = class UpdateInvoiceUseCase {
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
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
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
};
exports.UpdateInvoiceUseCase = UpdateInvoiceUseCase;
exports.UpdateInvoiceUseCase = UpdateInvoiceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.INVOICE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(core_1.TAX_CALCULATION_STRATEGY)),
    __param(2, (0, common_1.Inject)(output_port_1.UPDATE_INVOICE_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UpdateInvoiceUseCase);
//# sourceMappingURL=update-invoice.use-case.js.map
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
        // 1. La comprobación de 'NotFound' actúa como un type guard.
        // TypeScript sabe que después de esta línea, 'invoice' no puede ser null.
        let invoice = await this.invoiceRepository.findById(core_1.InvoiceId.fromString(id));
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        // Creamos una constante. En este punto, TypeScript sabe 100% que no es nula.
        const currentInvoice = invoice;
        // 2. Definimos las estrategias con tipos explícitos, ¡adiós 'any'!
        const updateStrategies = {
            customerId: (val) => currentInvoice.updateCustomerId(core_1.CustomerId.fromString(val)),
            status: (val) => currentInvoice.updateStatus(core_1.InvoiceStatus.fromString(val)),
            issueDate: (val) => currentInvoice.updateIssueDate(val),
            dueDate: (val) => currentInvoice.updateDueDate(val),
        };
        // 3. Iteramos y aplicamos las estrategias, reasignando la nueva instancia inmutable.
        for (const key of Object.keys(input)) {
            if (key in updateStrategies) {
                const strategy = updateStrategies[key];
                const value = input[key];
                if (strategy && value !== undefined) {
                    invoice = strategy(value); // Usamos 'as any' aquí de forma controlada porque TypeScript no puede inferir el tipo dinámico
                }
            }
        }
        // Manejo especial para 'items'
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
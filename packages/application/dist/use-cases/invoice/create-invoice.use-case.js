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
exports.CreateInvoiceUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
let CreateInvoiceUseCase = class CreateInvoiceUseCase {
    invoiceRepository;
    taxCalculationStrategy;
    constructor(invoiceRepository, taxCalculationStrategy) {
        this.invoiceRepository = invoiceRepository;
        this.taxCalculationStrategy = taxCalculationStrategy;
    }
    async execute(input) {
        // 1. Mapear y Calcular los ítems (Strategy)
        const items = input.items.map(itemDto => {
            const unitPrice = core_1.Money.fromFloat(itemDto.unitPrice, 'EUR');
            const calculatedResults = this.taxCalculationStrategy.calculate({
                unitPrice,
                quantity: itemDto.quantity,
                taxRate: itemDto.taxRate
            });
            // 1.3 Crear la entidad de dominio InvoiceItem con los valores fijos
            return core_1.InvoiceItem.create(itemDto.description, itemDto.quantity, unitPrice, itemDto.taxRate, 
            // Valores calculados por la Strategy
            calculatedResults.subtotal, calculatedResults.taxAmount, calculatedResults.total);
        });
        // 2. Crear y guardar la factura (Domain layer)
        const invoice = core_1.Invoice.create(core_1.CustomerId.fromString(input.customerId), new Date(input.issueDate), new Date(input.dueDate), items);
        await this.invoiceRepository.create(invoice);
        return invoice.getId().toString();
    }
};
exports.CreateInvoiceUseCase = CreateInvoiceUseCase;
exports.CreateInvoiceUseCase = CreateInvoiceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.INVOICE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(core_1.TAX_CALCULATION_STRATEGY)),
    __metadata("design:paramtypes", [Object, Object])
], CreateInvoiceUseCase);
//# sourceMappingURL=create-invoice.use-case.js.map
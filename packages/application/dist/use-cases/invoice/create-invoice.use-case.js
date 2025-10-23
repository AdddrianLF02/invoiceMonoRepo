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
const output_port_1 = require("./ports/output-port");
let CreateInvoiceUseCase = class CreateInvoiceUseCase {
    uow;
    taxCalculationStrategy;
    outputPort;
    constructor(uow, taxCalculationStrategy, outputPort) {
        this.uow = uow;
        this.taxCalculationStrategy = taxCalculationStrategy;
        this.outputPort = outputPort;
    }
    async execute(input) {
        console.log('[CreateInvoiceUseCase] Input recibido:', input);
        // Envolvemos la lógica de negocio en la transacción
        console.log('[CreateInvoiceUseCase] Entrando en transacción');
        const repo = this.uow.invoiceRepository;
        console.log('[CreateInvoiceUseCase] Repo:', !!repo);
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
        const invoice = core_1.Invoice.create(core_1.CustomerId.fromString(input.customerId), new Date(input.issueDate), new Date(input.dueDate), items);
        console.log('[CreateInvoiceUseCase] Factura creada:', invoice);
        await repo.create(invoice);
        console.log('[CreateInvoiceUseCase] Factura guardada en repositorio');
        this.outputPort.present(invoice);
        console.log('[CreateInvoiceUseCase] Presentando factura:', invoice);
    }
};
exports.CreateInvoiceUseCase = CreateInvoiceUseCase;
exports.CreateInvoiceUseCase = CreateInvoiceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.UNIT_OF_WORK)),
    __param(1, (0, common_1.Inject)(core_1.TAX_CALCULATION_STRATEGY)),
    __param(2, (0, common_1.Inject)(output_port_1.CREATE_INVOICE_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateInvoiceUseCase);
//# sourceMappingURL=create-invoice.use-case.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatTaxCalculationStrategy = void 0;
const common_1 = require("@nestjs/common");
let VatTaxCalculationStrategy = class VatTaxCalculationStrategy {
    calculate(input) {
        const subtotal = input.unitPrice.multiply(input.quantity);
        const taxAmount = subtotal.multiply(input.taxRate / 100);
        const total = subtotal.add(taxAmount);
        return { subtotal, taxAmount, total };
    }
};
exports.VatTaxCalculationStrategy = VatTaxCalculationStrategy;
exports.VatTaxCalculationStrategy = VatTaxCalculationStrategy = __decorate([
    (0, common_1.Injectable)()
], VatTaxCalculationStrategy);
//# sourceMappingURL=vat-tax-calculation.strategy.js.map
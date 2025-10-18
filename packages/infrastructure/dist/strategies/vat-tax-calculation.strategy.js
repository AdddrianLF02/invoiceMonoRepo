"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatTaxCalculationStrategy = void 0;
class VatTaxCalculationStrategy {
    calculate(input) {
        const subtotal = input.unitPrice.multiply(input.quantity);
        const taxAmount = subtotal.multiply(input.taxRate / 100);
        const total = subtotal.add(taxAmount);
        return { subtotal, taxAmount, total };
    }
}
exports.VatTaxCalculationStrategy = VatTaxCalculationStrategy;
//# sourceMappingURL=vat-tax-calculation.strategy.js.map
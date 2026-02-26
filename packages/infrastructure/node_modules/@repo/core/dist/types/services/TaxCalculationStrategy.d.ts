import { Money } from "../value-objects/Money";
export type ItemCalculationData = {
    unitPrice: Money;
    quantity: number;
    taxRate: number;
};
export type ItemCalculationResult = {
    subtotal: Money;
    taxAmount: Money;
    total: Money;
};
export interface ITaxCalculationStrategy {
    calculate(itemData: ItemCalculationData): ItemCalculationResult;
}
export declare const TAX_CALCULATION_STRATEGY = "TaxCalculationStrategy";
//# sourceMappingURL=TaxCalculationStrategy.d.ts.map
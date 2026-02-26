import { Money } from "../value-objects/Money";
export declare class InvoiceItem {
    private readonly id;
    private readonly description;
    private readonly quantity;
    private readonly unitPrice;
    private readonly taxRate;
    private readonly subtotal;
    private readonly taxAmount;
    private readonly total;
    static create(description: string, quantity: number, unitPrice: Money, taxRate: number, subtotal: Money, taxAmount: Money, total: Money): InvoiceItem;
    static reconstitute(id: string, description: string, quantity: number, unitPrice: Money, taxRate: number, subtotalInCents: number, taxAmountInCents: number, totalInCents: number): InvoiceItem;
    private constructor();
    getId(): string;
    getDescription(): string;
    getQuantity(): number;
    getUnitPrice(): Money;
    getTaxRate(): number;
    getSubtotal(): Money;
    getTaxAmount(): Money;
    getTotal(): Money;
    private validate;
}
//# sourceMappingURL=InvoiceItem.d.ts.map
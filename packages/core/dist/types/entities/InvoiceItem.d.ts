import { Money } from "../value-objects/Money";
export declare class InvoiceItem {
    private readonly id;
    private readonly description;
    private readonly quantity;
    private readonly unitPrice;
    private readonly taxRate;
    static create(description: string, quantity: number, unitPrice: Money, taxRate: number): InvoiceItem;
    static reconstitute(id: string, description: string, quantity: number, unitPrice: Money, taxRate: number): InvoiceItem;
    constructor(id: string, description: string, quantity: number, unitPrice: Money, taxRate: number);
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
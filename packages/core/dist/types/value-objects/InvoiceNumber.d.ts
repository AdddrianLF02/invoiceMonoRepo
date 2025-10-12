/**
 * Value Object para representar el número de una factura.
 * Encapsula la lógica de validación y formato del número de factura.
 */
export declare class InvoiceNumber {
    private readonly value;
    private constructor();
    static create(value: string): InvoiceNumber;
    static fromString(value: string): InvoiceNumber;
    getValue(): string;
    equals(other?: InvoiceNumber): boolean;
    toString(): string;
}
//# sourceMappingURL=InvoiceNumber.d.ts.map
/**
 * Value Object para representar el ID de una factura.
 * Encapsulamos la lógica de negocio relacionada con el ID de la factura.
 */
export declare class InvoiceId {
    private readonly value;
    private constructor();
    static create(): InvoiceId;
    static fromString(id: string): InvoiceId;
    getValue(): string;
    equals(id?: InvoiceId): boolean;
    toString(): string;
}
//# sourceMappingURL=InvoiceId.d.ts.map
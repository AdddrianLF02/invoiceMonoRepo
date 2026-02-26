/**
 * Value Object para representar el estado de una factura.
 * Utiliza un enum para limitar los posibles estados.
 */
export declare enum InvoiceStatusEnum {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    OVERDUE = "OVERDUE"
}
export declare class InvoiceStatus {
    private readonly value;
    private constructor();
    static create(status: string): InvoiceStatus;
    static draft(): InvoiceStatus;
    static pending(): InvoiceStatus;
    static paid(): InvoiceStatus;
    static cancelled(): InvoiceStatus;
    static overdue(): InvoiceStatus;
    static fromString(status: string): InvoiceStatus;
    getValue(): InvoiceStatusEnum;
    equals(other?: InvoiceStatus): boolean;
    toString(): string;
    isDraft(): boolean;
    isPending(): boolean;
    isPaid(): boolean;
    isCancelled(): boolean;
    isOverdue(): boolean;
}
//# sourceMappingURL=InvoiceStatus.d.ts.map
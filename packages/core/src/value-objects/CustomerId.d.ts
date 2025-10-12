import z from 'zod';
export declare const CustomerIdSchema: z.ZodString;
/**
 * Value Object para representar el ID de un cliente.
 * Encapsulamos la lógica de negocio relacionada con el ID del cliente.
 */
export declare class CustomerId {
    private readonly value;
    private constructor();
    static create(): CustomerId;
    static fromString(id: string): CustomerId;
    getValue(): string;
    equals(id?: CustomerId): boolean;
    toString(): string;
}
//# sourceMappingURL=CustomerId.d.ts.map
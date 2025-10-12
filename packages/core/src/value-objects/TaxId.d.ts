import { z } from "zod";
export declare const TaxIdSchema: z.ZodString;
export declare class TaxId {
    private readonly value;
    private readonly type;
    private constructor();
    static create(value: string): TaxId;
    getValue(): string;
    getType(): 'NIF' | 'CIF' | 'OTHER';
    equals(taxId?: TaxId): boolean;
    toString(): string;
}
//# sourceMappingURL=TaxId.d.ts.map
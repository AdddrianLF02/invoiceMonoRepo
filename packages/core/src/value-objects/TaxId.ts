import { z } from "zod";

export const TaxIdSchema = z.string().min(1, 'El Tax ID es requerido');

export class TaxId {
    private readonly value: string;
    private readonly type: 'NIF' | 'CIF' | 'OTHER';

    private constructor(value: string, type: 'NIF' | 'CIF' | 'OTHER') {
        this.value = value;
        this.type = type;
    }

    public static create(value: string): TaxId {
        if(!value){
            throw new Error('Tax ID cannot be empty');
        }

        // Validación básica y determinación del tipo
        // Esto es una simplifación, en un caso real habría validaciones más complejas
        let type: 'NIF' | 'CIF' | 'OTHER';
        if(value.length === 9 && /^\d+$/.test(value)) {
            type = 'NIF';
        } else if (value.length === 10 && /^[A-Z]\d{8}$/.test(value)) {
            type = 'CIF';
        } else {
            type = 'OTHER';
        }
        return new TaxId(value, type);
    }

    public getValue(): string {
        return this.value
    }

    public getType(): 'NIF' | 'CIF' | 'OTHER' {
        return this.type;
    }

    public equals(taxId?: TaxId): boolean {
        if(taxId === null || taxId === undefined){
            return false;
        }
        return this.value === taxId.value && this.type === taxId.type;
    }

    public toString(): string {
        return this.value;
    }
}
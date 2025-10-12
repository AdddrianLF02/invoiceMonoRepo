"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxId = exports.TaxIdSchema = void 0;
const zod_1 = require("zod");
exports.TaxIdSchema = zod_1.z.string().min(1, 'El Tax ID es requerido');
class TaxId {
    value;
    type;
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    static create(value) {
        if (!value) {
            throw new Error('Tax ID cannot be empty');
        }
        // Validación básica y determinación del tipo
        // Esto es una simplifación, en un caso real habría validaciones más complejas
        let type;
        if (value.length === 9 && /^\d+$/.test(value)) {
            type = 'NIF';
        }
        else if (value.length === 10 && /^[A-Z]\d{8}$/.test(value)) {
            type = 'CIF';
        }
        else {
            type = 'OTHER';
        }
        return new TaxId(value, type);
    }
    getValue() {
        return this.value;
    }
    getType() {
        return this.type;
    }
    equals(taxId) {
        if (taxId === null || taxId === undefined) {
            return false;
        }
        return this.value === taxId.value && this.type === taxId.type;
    }
    toString() {
        return this.value;
    }
}
exports.TaxId = TaxId;
//# sourceMappingURL=TaxId.js.map
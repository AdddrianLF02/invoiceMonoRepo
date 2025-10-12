"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceNumber = void 0;
/**
 * Value Object para representar el número de una factura.
 * Encapsula la lógica de validación y formato del número de factura.
 */
class InvoiceNumber {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Invoice number cannot be empty');
        }
        // Aquí podríamos añadir validaciones adicionales según las reglas de negocio
        // Por ejemplo, formato específico, longitud, etc.
        return new InvoiceNumber(value);
    }
    static fromString(value) {
        return InvoiceNumber.create(value);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof InvoiceNumber)) {
            return false;
        }
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
exports.InvoiceNumber = InvoiceNumber;
//# sourceMappingURL=InvoiceNumber.js.map
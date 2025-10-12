"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceId = void 0;
const uuid_1 = require("uuid");
/**
 * Value Object para representar el ID de una factura.
 * Encapsulamos la lógica de negocio relacionada con el ID de la factura.
 */
class InvoiceId {
    value;
    // Constructor privado para evitar la creación directa de instancias
    constructor(id) {
        this.value = id;
    }
    // Generamos un nuevo UUID para nuevas facturas
    static create() {
        return new InvoiceId((0, uuid_1.v4)());
    }
    // Permite reconstruir el ID desde la base de datos.
    static fromString(id) {
        if (!id) {
            throw new Error('InvoiceId cannot be empty');
        }
        return new InvoiceId(id);
    }
    getValue() {
        return this.value;
    }
    // Implementamos comparación por valor, no por referencia.
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof InvoiceId)) {
            return false;
        }
        return this.value === id.value;
    }
    toString() {
        return this.value;
    }
}
exports.InvoiceId = InvoiceId;
//# sourceMappingURL=InvoiceId.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = void 0;
const uuid_1 = require("uuid");
class InvoiceItem {
    id;
    description;
    quantity;
    unitPrice;
    taxRate; // Se mantiene como dato histórico/auditoría
    // Valores calculados y fijos (resultados de la Strategy en la Capa Application)
    subtotal;
    taxAmount;
    total;
    // --- FACTORY METHOD: CREACIÓN (Uso en Casos de Uso) ---
    // Requiere explícitamente los valores calculados por la Strategy externa.
    static create(description, quantity, unitPrice, taxRate, subtotal, taxAmount, total) {
        // Invariante de Consistencia: Garantizamos que la suma de los componentes sea correcta
        if (!total.equals(subtotal.add(taxAmount))) {
            throw new Error('Calculated total does not match subtotal + tax amount');
        }
        return new InvoiceItem((0, uuid_1.v4)(), description, quantity, unitPrice, taxRate, subtotal, taxAmount, total);
    }
    // --- FACTORY METHOD: RECONSTITUCIÓN (Uso en Repositorios) ---
    // Debe aceptar todos los campos (incluidos los calculados) para restaurar el estado desde la BBDD.
    static reconstitute(id, description, quantity, unitPrice, taxRate, subtotal, // <-- AÑADIDO
    taxAmount, // <-- AÑADIDO
    total // <-- AÑADIDO
    ) {
        // No chequeamos la invariante aquí, ya que asumimos que la BBDD almacena datos válidos.
        return new InvoiceItem(id, description, quantity, unitPrice, taxRate, subtotal, taxAmount, total);
    }
    // --- CONSTRUCTOR PRIVADO (Con todos los campos) ---
    constructor(id, description, quantity, unitPrice, taxRate, subtotal, taxAmount, total) {
        this.validate(description, quantity, taxRate);
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxRate = taxRate;
        this.subtotal = subtotal;
        this.taxAmount = taxAmount;
        this.total = total;
    }
    // --- GETTERS (SOLO DEVUELVEN EL ESTADO ALMACENADO) ---
    getId() {
        return this.id;
    }
    getDescription() {
        return this.description;
    }
    getQuantity() {
        return this.quantity;
    }
    getUnitPrice() {
        return this.unitPrice;
    }
    getTaxRate() {
        return this.taxRate;
    }
    // CORREGIDO: Solo devuelve el valor almacenado por la Strategy
    getSubtotal() {
        return this.subtotal;
    }
    // CORREGIDO: Solo devuelve el valor almacenado por la Strategy
    getTaxAmount() {
        return this.taxAmount;
    }
    // CORREGIDO: Solo devuelve el valor almacenado por la Strategy
    getTotal() {
        return this.total;
    }
    validate(description, quantity, taxRate) {
        if (!description || description.trim().length === 0) {
            throw new Error('Item description cannot be empty');
        }
        if (quantity <= 0) {
            throw new Error('Item quantity must be greater than zero');
        }
        if (taxRate < 0) {
            throw new Error('Tax rate cannot be negative');
        }
    }
}
exports.InvoiceItem = InvoiceItem;
//# sourceMappingURL=InvoiceItem.js.map
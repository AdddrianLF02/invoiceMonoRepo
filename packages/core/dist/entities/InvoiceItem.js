"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = void 0;
const Money_1 = require("../value-objects/Money");
const InvoiceItemId_1 = require("../value-objects/InvoiceItemId");
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
        return new InvoiceItem(InvoiceItemId_1.InvoiceItemId.create(), description, quantity, unitPrice, taxRate, subtotal, taxAmount, total);
    }
    // --- FACTORY METHOD: RECONSTITUCIÓN (Uso en Repositorios) ---
    static reconstitute(id, description, quantity, unitPrice, taxRate, subtotalInCents, taxAmountInCents, totalInCents) {
        // Convertimos de centavos a valor decimal (dividiendo por 100)
        const subtotal = Money_1.Money.fromFloat(subtotalInCents / 100, unitPrice.getCurrency());
        const taxAmount = Money_1.Money.fromFloat(taxAmountInCents / 100, unitPrice.getCurrency());
        const total = Money_1.Money.fromFloat(totalInCents / 100, unitPrice.getCurrency());
        return new InvoiceItem(InvoiceItemId_1.InvoiceItemId.fromString(id), description, quantity, unitPrice, taxRate, subtotal, taxAmount, total);
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
        return this.id.getValue();
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
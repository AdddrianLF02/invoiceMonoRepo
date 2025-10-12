"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = void 0;
const uuid_1 = require("uuid");
class InvoiceItem {
    id;
    description;
    quantity;
    unitPrice;
    taxRate;
    static create(description, quantity, unitPrice, taxRate) {
        return new InvoiceItem((0, uuid_1.v4)(), description, quantity, unitPrice, taxRate);
    }
    static reconstitute(id, description, quantity, unitPrice, taxRate) {
        return new InvoiceItem(id, description, quantity, unitPrice, taxRate);
    }
    constructor(id, description, quantity, unitPrice, taxRate) {
        this.validate(description, quantity, taxRate);
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxRate = taxRate;
    }
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
    getSubtotal() {
        return this.unitPrice.multiply(this.quantity);
    }
    getTaxAmount() {
        const subtotal = this.getSubtotal();
        return subtotal.multiply(this.taxRate / 100);
    }
    getTotal() {
        const subtotal = this.getSubtotal();
        const taxAmount = this.getTaxAmount();
        return subtotal.add(taxAmount);
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
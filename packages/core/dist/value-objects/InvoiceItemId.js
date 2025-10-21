"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItemId = void 0;
const crypto_1 = require("crypto");
class InvoiceItemId {
    value;
    constructor(value) {
        this.value = value;
    }
    static create() {
        return new InvoiceItemId((0, crypto_1.randomUUID)());
    }
    static fromString(id) {
        if (!id) {
            throw new Error('InvoiceItemId cannot be empty');
        }
        return new InvoiceItemId(id);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.InvoiceItemId = InvoiceItemId;
//# sourceMappingURL=InvoiceItemId.js.map
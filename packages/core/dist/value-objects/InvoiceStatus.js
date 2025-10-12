"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatus = exports.InvoiceStatusEnum = void 0;
/**
 * Value Object para representar el estado de una factura.
 * Utiliza un enum para limitar los posibles estados.
 */
var InvoiceStatusEnum;
(function (InvoiceStatusEnum) {
    InvoiceStatusEnum["DRAFT"] = "DRAFT";
    InvoiceStatusEnum["PENDING"] = "PENDING";
    InvoiceStatusEnum["PAID"] = "PAID";
    InvoiceStatusEnum["CANCELLED"] = "CANCELLED";
    InvoiceStatusEnum["OVERDUE"] = "OVERDUE";
})(InvoiceStatusEnum || (exports.InvoiceStatusEnum = InvoiceStatusEnum = {}));
class InvoiceStatus {
    value;
    constructor(status) {
        this.value = status;
    }
    static create(status) {
        if (!Object.values(InvoiceStatusEnum).includes(status)) {
            throw new Error(`Invalid invoice status: ${status}`);
        }
        return new InvoiceStatus(status);
    }
    static draft() {
        return new InvoiceStatus(InvoiceStatusEnum.DRAFT);
    }
    static pending() {
        return new InvoiceStatus(InvoiceStatusEnum.PENDING);
    }
    static paid() {
        return new InvoiceStatus(InvoiceStatusEnum.PAID);
    }
    static cancelled() {
        return new InvoiceStatus(InvoiceStatusEnum.CANCELLED);
    }
    static overdue() {
        return new InvoiceStatus(InvoiceStatusEnum.OVERDUE);
    }
    static fromString(status) {
        return InvoiceStatus.create(status);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof InvoiceStatus)) {
            return false;
        }
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
    isDraft() {
        return this.value === InvoiceStatusEnum.DRAFT;
    }
    isPending() {
        return this.value === InvoiceStatusEnum.PENDING;
    }
    isPaid() {
        return this.value === InvoiceStatusEnum.PAID;
    }
    isCancelled() {
        return this.value === InvoiceStatusEnum.CANCELLED;
    }
    isOverdue() {
        return this.value === InvoiceStatusEnum.OVERDUE;
    }
}
exports.InvoiceStatus = InvoiceStatus;
//# sourceMappingURL=InvoiceStatus.js.map
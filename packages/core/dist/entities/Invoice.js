"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const InvoiceId_1 = require("../value-objects/InvoiceId");
const InvoiceNumber_1 = require("../value-objects/InvoiceNumber");
const InvoiceStatus_1 = require("../value-objects/InvoiceStatus");
const Money_1 = require("../value-objects/Money");
class Invoice {
    id;
    customerId;
    invoiceNumber;
    status;
    issueDate;
    dueDate;
    items;
    createdAt;
    updatedAt;
    constructor(id, customerId, invoiceNumber, status, issueDate, dueDate, items = [], createdAt, updatedAt) {
        this.id = id;
        this.customerId = customerId;
        this.invoiceNumber = invoiceNumber;
        this.status = status;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.items = items;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    // FACTORY METHOD
    static create(customerId, issueDate, dueDate, items = []) {
        if (dueDate < issueDate) {
            throw new Error('Due date cannot be before issue date');
        }
        // Generamos automáticamente el número de factura
        const invoiceNumber = InvoiceNumber_1.InvoiceNumber.create(`INV-${Date.now()}`);
        return new Invoice(InvoiceId_1.InvoiceId.create(), customerId, invoiceNumber, InvoiceStatus_1.InvoiceStatus.draft(), issueDate, dueDate, items);
    }
    // FACTORY METHOD (RECONSTITUCIÓN)
    static reconstitute(id, customerId, invoiceNumber, status, issueDate, dueDate, items = [], createdAt, updatedAt) {
        return new Invoice(id, customerId, invoiceNumber, status, issueDate, dueDate, items, createdAt, updatedAt);
    }
    // NUEVO MÉTODO AYUDANTE- PROXY --
    copyWith(props) {
        return new Invoice(this.id, props.customerId ?? this.customerId, props.invoiceNumber ?? this.invoiceNumber, props.status ?? this.status, props.issueDate ?? this.issueDate, props.dueDate ?? this.dueDate, props.items ?? this.items, this.createdAt, new Date());
    }
    // Getters
    getId() {
        return this.id;
    }
    getCustomerId() {
        return this.customerId;
    }
    getInvoiceNumber() {
        return this.invoiceNumber;
    }
    getStatus() {
        return this.status;
    }
    getIssueDate() {
        return this.issueDate;
    }
    getDueDate() {
        return this.dueDate;
    }
    getItems() {
        return [...this.items]; // Devolvemos una copia para evitar modificaciones externas
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    // --- MÉTODOS DE COMPORTAMIENTO (AHORA 100% INMUTABLES) ---
    updateCustomerId(customerId) {
        if (!this.status.isDraft())
            throw new Error('Cannot update customer ID unless invoice is in draft status');
        return this.copyWith({ customerId });
    }
    updateStatus(status) {
        // ... tu lógica de validación ...
        return this.copyWith({ status });
    }
    updateIssueDate(issueDate) {
        if (!this.status.isDraft())
            throw new Error('Cannot update issue date unless invoice is in draft status');
        if (issueDate > this.dueDate)
            throw new Error('Issue date cannot be after due date');
        return this.copyWith({ issueDate });
    }
    updateDueDate(dueDate) {
        if (dueDate < this.issueDate)
            throw new Error('Due date cannot be before issue date');
        return this.copyWith({ dueDate });
    }
    updateInvoiceNumber(invoiceNumber) {
        if (!this.status.isDraft())
            throw new Error('Cannot update invoice number unless invoice is in draft status');
        return this.copyWith({ invoiceNumber });
    }
    addItem(item) {
        if (!this.status.isDraft())
            throw new Error('Cannot add items unless invoice is in draft status');
        const newItems = [...this.items, item];
        return this.copyWith({ items: newItems });
    }
    // Refactorizado para ser inmutable y más robusto (usa ID, no índice)
    removeItem(itemId) {
        if (!this.status.isDraft())
            throw new Error('Cannot remove items unless invoice is in draft status');
        const newItems = this.items.filter(item => item.getId() !== itemId);
        if (newItems.length === this.items.length)
            throw new Error('Invalid item ID');
        return this.copyWith({ items: newItems });
    }
    clearItems() {
        if (!this.status.isDraft())
            throw new Error('Cannot clear items unless invoice is in draft status');
        return this.copyWith({ items: [] });
    }
    markAsPending() {
        if (!this.status.isDraft())
            throw new Error('Only draft invoices can be marked as pending');
        if (this.items.length === 0)
            throw new Error('Cannot mark as pending an invoice without items');
        return this.copyWith({ status: InvoiceStatus_1.InvoiceStatus.pending() });
    }
    markAsPaid() {
        if (!this.status.isPending() && !this.status.isOverdue())
            throw new Error('Only pending or overdue invoices can be marked as paid');
        return this.copyWith({ status: InvoiceStatus_1.InvoiceStatus.paid() });
    }
    markAsOverdue() {
        if (!this.status.isPending())
            throw new Error('Only pending invoices can be marked as overdue');
        const today = new Date();
        if (today <= this.dueDate)
            throw new Error('Cannot mark as overdue an invoice that is not past its due date');
        return this.copyWith({ status: InvoiceStatus_1.InvoiceStatus.overdue() });
    }
    cancel() {
        if (this.status.isPaid())
            throw new Error('Cannot cancel a paid invoice');
        return this.copyWith({ status: InvoiceStatus_1.InvoiceStatus.cancelled() });
    }
    // Cálculos
    getSubtotal() {
        if (this.items.length === 0) {
            return Money_1.Money.zero();
        }
        return this.items.reduce((total, item) => total.add(item.getSubtotal()), Money_1.Money.zero());
    }
    getTaxAmount() {
        if (this.items.length === 0) {
            return Money_1.Money.zero();
        }
        return this.items.reduce((total, item) => total.add(item.getTaxAmount()), Money_1.Money.zero());
    }
    getTotal() {
        if (this.items.length === 0) {
            return Money_1.Money.zero();
        }
        return this.items.reduce((total, item) => total.add(item.getTotal()), Money_1.Money.zero());
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=Invoice.js.map
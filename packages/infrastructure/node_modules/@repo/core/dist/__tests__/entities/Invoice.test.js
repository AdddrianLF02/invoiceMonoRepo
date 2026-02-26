"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Invoice_1 = require("../../entities/Invoice");
const CustomerId_1 = require("../../value-objects/CustomerId");
const InvoiceId_1 = require("../../value-objects/InvoiceId");
const InvoiceNumber_1 = require("../../value-objects/InvoiceNumber");
const InvoiceStatus_1 = require("../../value-objects/InvoiceStatus");
const InvoiceItem_1 = require("../../entities/InvoiceItem");
const Money_1 = require("../../value-objects/Money");
describe('Invoice', () => {
    // Datos de prueba comunes
    const customerId = CustomerId_1.CustomerId.create();
    const issueDate = new Date('2023-01-01');
    const dueDate = new Date('2023-01-31');
    const items = [];
    describe('create', () => {
        it('should create a valid Invoice with default values', () => {
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate);
            expect(invoice).toBeInstanceOf(Invoice_1.Invoice);
            expect(invoice.getId()).toBeInstanceOf(InvoiceId_1.InvoiceId);
            expect(invoice.getCustomerId()).toBe(customerId);
            expect(invoice.getInvoiceNumber()).toBeInstanceOf(InvoiceNumber_1.InvoiceNumber);
            expect(invoice.getStatus().getValue()).toBe('DRAFT');
            expect(invoice.getIssueDate()).toEqual(issueDate);
            expect(invoice.getDueDate()).toEqual(dueDate);
            expect(invoice.getItems()).toEqual([]);
            expect(invoice.getCreatedAt()).toBeInstanceOf(Date);
            expect(invoice.getUpdatedAt()).toBeInstanceOf(Date);
        });
        it('should create a valid Invoice with provided items', () => {
            const mockItem = {}; // Mock para la prueba
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate, [mockItem]);
            expect(invoice.getItems()).toHaveLength(1);
            expect(invoice.getItems()[0]).toBe(mockItem);
        });
        it('should throw an error when due date is before issue date', () => {
            const invalidDueDate = new Date('2022-12-31'); // Antes de la fecha de emisión
            expect(() => {
                Invoice_1.Invoice.create(customerId, issueDate, invalidDueDate);
            }).toThrow('Due date cannot be before issue date');
        });
    });
    describe('reconstitute', () => {
        it('should reconstitute an Invoice with all provided values', () => {
            const id = InvoiceId_1.InvoiceId.create();
            const invoiceNumber = InvoiceNumber_1.InvoiceNumber.create('INV-12345');
            const status = InvoiceStatus_1.InvoiceStatus.paid();
            const createdAt = new Date('2023-01-01T10:00:00Z');
            const updatedAt = new Date('2023-01-02T10:00:00Z');
            const invoice = Invoice_1.Invoice.reconstitute(id, customerId, invoiceNumber, status, issueDate, dueDate, items, createdAt, updatedAt);
            expect(invoice.getId()).toBe(id);
            expect(invoice.getCustomerId()).toBe(customerId);
            expect(invoice.getInvoiceNumber()).toBe(invoiceNumber);
            expect(invoice.getStatus()).toBe(status);
            expect(invoice.getIssueDate()).toBe(issueDate);
            expect(invoice.getDueDate()).toBe(dueDate);
            expect(invoice.getItems()).toEqual(items);
            expect(invoice.getCreatedAt()).toBe(createdAt);
            expect(invoice.getUpdatedAt()).toBe(updatedAt);
        });
    });
    describe('getters', () => {
        it('should return the correct values for all getters', () => {
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate);
            expect(invoice.getId()).toBeInstanceOf(InvoiceId_1.InvoiceId);
            expect(invoice.getCustomerId()).toBe(customerId);
            expect(invoice.getInvoiceNumber()).toBeInstanceOf(InvoiceNumber_1.InvoiceNumber);
            expect(invoice.getStatus().getValue()).toBe('DRAFT');
            expect(invoice.getIssueDate()).toEqual(issueDate);
            expect(invoice.getDueDate()).toEqual(dueDate);
            expect(Array.isArray(invoice.getItems())).toBe(true);
            expect(invoice.getCreatedAt()).toBeInstanceOf(Date);
            expect(invoice.getUpdatedAt()).toBeInstanceOf(Date);
        });
        it('should return a copy of items array to prevent external modifications', () => {
            const mockItem = {};
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate, [mockItem]);
            const items = invoice.getItems();
            items.push({});
            expect(invoice.getItems()).toHaveLength(1); // El array original no debe modificarse
        });
    });
    // Pruebas para los métodos de negocio
    describe('business methods', () => {
        it('should mark invoice as paid', () => {
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate);
            // Creamos un item para la factura
            const unitPrice = Money_1.Money.fromFloat(100, 'EUR');
            const quantity = 1;
            const taxRate = 10; // 10%
            // Calculamos los valores necesarios
            const subtotal = unitPrice.multiply(quantity);
            const taxAmount = subtotal.multiply(taxRate / 100);
            const total = subtotal.add(taxAmount);
            const item = InvoiceItem_1.InvoiceItem.create('Item 1', quantity, unitPrice, taxRate, subtotal, taxAmount, total);
            // Agregamos el item a la factura
            const invoiceWithItems = invoice.addItem(item);
            // Marcamos como pendiente y luego como pagada
            const pendingInvoice = invoiceWithItems.markAsPending();
            const paidInvoice = pendingInvoice.markAsPaid();
            expect(paidInvoice.getStatus().getValue()).toBe('PAID');
            expect(paidInvoice).not.toBe(pendingInvoice); // Debe ser una nueva instancia
        });
        it('should calculate total amount correctly', () => {
            const mockItem1 = {
                getTotal: jest.fn().mockReturnValue(Money_1.Money.fromFloat(100, 'EUR'))
            };
            const mockItem2 = {
                getTotal: jest.fn().mockReturnValue(Money_1.Money.fromFloat(200, 'EUR'))
            };
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate, [mockItem1, mockItem2]);
            const total = invoice.getTotal();
            expect(total.getAmountAsFloat()).toBe(300);
            expect(total.getCurrency()).toBe('EUR');
        });
        it('should add item to invoice', () => {
            const invoice = Invoice_1.Invoice.create(customerId, issueDate, dueDate);
            const mockItem = {};
            const updatedInvoice = invoice.addItem(mockItem);
            expect(updatedInvoice.getItems()).toHaveLength(1);
            expect(updatedInvoice.getItems()[0]).toBe(mockItem);
            expect(updatedInvoice).not.toBe(invoice); // Debe ser una nueva instancia
        });
    });
});
//# sourceMappingURL=Invoice.test.js.map
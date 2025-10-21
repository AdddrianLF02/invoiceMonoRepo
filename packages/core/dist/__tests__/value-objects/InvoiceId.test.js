"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvoiceId_1 = require("../../value-objects/InvoiceId");
describe('InvoiceId', () => {
    describe('create', () => {
        it('should create a new InvoiceId with a valid UUID', () => {
            const invoiceId = InvoiceId_1.InvoiceId.create();
            expect(invoiceId).toBeDefined();
            expect(invoiceId.getValue()).toBeDefined();
            expect(typeof invoiceId.getValue()).toBe('string');
            // Verificar formato UUID
            expect(invoiceId.getValue()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
        });
    });
    describe('fromString', () => {
        it('should create an InvoiceId from a valid string', () => {
            const idString = '123e4567-e89b-12d3-a456-426614174000';
            const invoiceId = InvoiceId_1.InvoiceId.fromString(idString);
            expect(invoiceId).toBeDefined();
            expect(invoiceId.getValue()).toBe(idString);
        });
        it('should throw an error when creating from an empty string', () => {
            expect(() => {
                InvoiceId_1.InvoiceId.fromString('');
            }).toThrow('InvoiceId cannot be empty');
        });
    });
    describe('getValue', () => {
        it('should return the value of the InvoiceId', () => {
            const idString = '123e4567-e89b-12d3-a456-426614174000';
            const invoiceId = InvoiceId_1.InvoiceId.fromString(idString);
            expect(invoiceId.getValue()).toBe(idString);
        });
    });
    describe('equals', () => {
        it('should return true when comparing the same InvoiceId', () => {
            const idString = '123e4567-e89b-12d3-a456-426614174000';
            const invoiceId1 = InvoiceId_1.InvoiceId.fromString(idString);
            const invoiceId2 = InvoiceId_1.InvoiceId.fromString(idString);
            expect(invoiceId1.equals(invoiceId2)).toBe(true);
        });
        it('should return false when comparing different InvoiceIds', () => {
            const invoiceId1 = InvoiceId_1.InvoiceId.fromString('123e4567-e89b-12d3-a456-426614174000');
            const invoiceId2 = InvoiceId_1.InvoiceId.fromString('223e4567-e89b-12d3-a456-426614174001');
            expect(invoiceId1.equals(invoiceId2)).toBe(false);
        });
        it('should return false when comparing with null', () => {
            const invoiceId = InvoiceId_1.InvoiceId.fromString('123e4567-e89b-12d3-a456-426614174000');
            expect(invoiceId.equals(null)).toBe(false);
        });
        it('should return false when comparing with undefined', () => {
            const invoiceId = InvoiceId_1.InvoiceId.fromString('123e4567-e89b-12d3-a456-426614174000');
            expect(invoiceId.equals(undefined)).toBe(false);
        });
        it('should return false when comparing with a non-InvoiceId object', () => {
            const invoiceId = InvoiceId_1.InvoiceId.fromString('123e4567-e89b-12d3-a456-426614174000');
            // @ts-ignore - Ignoramos el error de tipo para probar el caso
            expect(invoiceId.equals('not-an-invoice-id')).toBe(false);
        });
    });
    describe('toString', () => {
        it('should return the string representation of the InvoiceId', () => {
            const idString = '123e4567-e89b-12d3-a456-426614174000';
            const invoiceId = InvoiceId_1.InvoiceId.fromString(idString);
            expect(invoiceId.toString()).toBe(idString);
        });
    });
});
//# sourceMappingURL=InvoiceId.test.js.map
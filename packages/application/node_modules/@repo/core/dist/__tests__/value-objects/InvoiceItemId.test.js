"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvoiceItemId_1 = require("../../value-objects/InvoiceItemId");
describe('InvoiceItemId', () => {
    it('should create a new InvoiceItemId with a random UUID', () => {
        const id = InvoiceItemId_1.InvoiceItemId.create();
        expect(id.getValue()).toBeDefined();
        expect(typeof id.getValue()).toBe('string');
        expect(id.getValue().length).toBeGreaterThan(0);
    });
    it('should create an InvoiceItemId from a string', () => {
        const idString = '123e4567-e89b-12d3-a456-426614174000';
        const id = InvoiceItemId_1.InvoiceItemId.fromString(idString);
        expect(id.getValue()).toBe(idString);
    });
    it('should throw an error when creating from an empty string', () => {
        expect(() => {
            InvoiceItemId_1.InvoiceItemId.fromString('');
        }).toThrow('InvoiceItemId cannot be empty');
    });
    it('should compare two InvoiceItemIds correctly', () => {
        const idString = '123e4567-e89b-12d3-a456-426614174000';
        const id1 = InvoiceItemId_1.InvoiceItemId.fromString(idString);
        const id2 = InvoiceItemId_1.InvoiceItemId.fromString(idString);
        const id3 = InvoiceItemId_1.InvoiceItemId.create();
        expect(id1.equals(id2)).toBe(true);
        expect(id1.equals(id3)).toBe(false);
    });
});
//# sourceMappingURL=InvoiceItemId.test.js.map
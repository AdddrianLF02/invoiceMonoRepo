import { InvoiceNumber } from '../../value-objects/InvoiceNumber';

describe('InvoiceNumber', () => {
  describe('create', () => {
    it('should create a new InvoiceNumber with a valid value', () => {
      const invoiceNumber = InvoiceNumber.create('INV-2023-001');
      expect(invoiceNumber).toBeDefined();
      expect(invoiceNumber.getValue()).toBe('INV-2023-001');
    });

    it('should throw an error when creating with an empty string', () => {
      expect(() => {
        InvoiceNumber.create('');
      }).toThrow('Invoice number cannot be empty');
    });

    it('should throw an error when creating with only whitespace', () => {
      expect(() => {
        InvoiceNumber.create('   ');
      }).toThrow('Invoice number cannot be empty');
    });
  });

  describe('fromString', () => {
    it('should create an InvoiceNumber from a valid string', () => {
      const invoiceNumber = InvoiceNumber.fromString('INV-2023-001');
      expect(invoiceNumber).toBeDefined();
      expect(invoiceNumber.getValue()).toBe('INV-2023-001');
    });

    it('should throw an error when creating from an empty string', () => {
      expect(() => {
        InvoiceNumber.fromString('');
      }).toThrow('Invoice number cannot be empty');
    });
  });

  describe('getValue', () => {
    it('should return the value of the InvoiceNumber', () => {
      const invoiceNumber = InvoiceNumber.create('INV-2023-001');
      expect(invoiceNumber.getValue()).toBe('INV-2023-001');
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same InvoiceNumber', () => {
      const invoiceNumber1 = InvoiceNumber.create('INV-2023-001');
      const invoiceNumber2 = InvoiceNumber.create('INV-2023-001');
      expect(invoiceNumber1.equals(invoiceNumber2)).toBe(true);
    });

    it('should return false when comparing different InvoiceNumbers', () => {
      const invoiceNumber1 = InvoiceNumber.create('INV-2023-001');
      const invoiceNumber2 = InvoiceNumber.create('INV-2023-002');
      expect(invoiceNumber1.equals(invoiceNumber2)).toBe(false);
    });

    it('should return false when comparing with null', () => {
      const invoiceNumber = InvoiceNumber.create('INV-2023-001');
      expect(invoiceNumber.equals(null)).toBe(false);
    });

    it('should return false when comparing with undefined', () => {
      const invoiceNumber = InvoiceNumber.create('INV-2023-001');
      expect(invoiceNumber.equals(undefined)).toBe(false);
    });

    it('should return false when comparing with a non-InvoiceNumber object', () => {
      const invoiceNumber = InvoiceNumber.create('INV-2023-001');
      // @ts-ignore - Ignoramos el error de tipo para probar el caso
      expect(invoiceNumber.equals('not-an-invoice-number')).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the string representation of the InvoiceNumber', () => {
      const invoiceNumber = InvoiceNumber.create('INV-2023-001');
      expect(invoiceNumber.toString()).toBe('INV-2023-001');
    });
  });
});
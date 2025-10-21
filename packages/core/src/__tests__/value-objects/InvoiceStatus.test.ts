import { InvoiceStatus, InvoiceStatusEnum } from '../../value-objects/InvoiceStatus';

describe('InvoiceStatus', () => {
  describe('create', () => {
    it('should create a new InvoiceStatus with a valid status', () => {
      const status = InvoiceStatus.create('DRAFT');
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(InvoiceStatusEnum.DRAFT);
    });

    it('should throw an error when creating with an invalid status', () => {
      expect(() => {
        InvoiceStatus.create('INVALID_STATUS');
      }).toThrow('Invalid invoice status: INVALID_STATUS');
    });
  });

  describe('factory methods', () => {
    it('should create a DRAFT status', () => {
      const status = InvoiceStatus.draft();
      expect(status.getValue()).toBe(InvoiceStatusEnum.DRAFT);
    });

    it('should create a PENDING status', () => {
      const status = InvoiceStatus.pending();
      expect(status.getValue()).toBe(InvoiceStatusEnum.PENDING);
    });

    it('should create a PAID status', () => {
      const status = InvoiceStatus.paid();
      expect(status.getValue()).toBe(InvoiceStatusEnum.PAID);
    });

    it('should create a CANCELLED status', () => {
      const status = InvoiceStatus.cancelled();
      expect(status.getValue()).toBe(InvoiceStatusEnum.CANCELLED);
    });

    it('should create an OVERDUE status', () => {
      const status = InvoiceStatus.overdue();
      expect(status.getValue()).toBe(InvoiceStatusEnum.OVERDUE);
    });
  });

  describe('fromString', () => {
    it('should create an InvoiceStatus from a valid string', () => {
      const status = InvoiceStatus.fromString('PAID');
      expect(status).toBeDefined();
      expect(status.getValue()).toBe(InvoiceStatusEnum.PAID);
    });

    it('should throw an error when creating from an invalid string', () => {
      expect(() => {
        InvoiceStatus.fromString('INVALID_STATUS');
      }).toThrow('Invalid invoice status: INVALID_STATUS');
    });
  });

  describe('getValue', () => {
    it('should return the value of the InvoiceStatus', () => {
      const status = InvoiceStatus.create('PENDING');
      expect(status.getValue()).toBe(InvoiceStatusEnum.PENDING);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same InvoiceStatus', () => {
      const status1 = InvoiceStatus.create('PAID');
      const status2 = InvoiceStatus.create('PAID');
      expect(status1.equals(status2)).toBe(true);
    });

    it('should return false when comparing different InvoiceStatus', () => {
      const status1 = InvoiceStatus.create('PAID');
      const status2 = InvoiceStatus.create('PENDING');
      expect(status1.equals(status2)).toBe(false);
    });

    it('should return false when comparing with null', () => {
      const status = InvoiceStatus.create('PAID');
      expect(status.equals(null)).toBe(false);
    });

    it('should return false when comparing with undefined', () => {
      const status = InvoiceStatus.create('PAID');
      expect(status.equals(undefined)).toBe(false);
    });

    it('should return false when comparing with a non-InvoiceStatus object', () => {
      const status = InvoiceStatus.create('PAID');
      // @ts-ignore - Ignoramos el error de tipo para probar el caso
      expect(status.equals('not-an-invoice-status')).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the string representation of the InvoiceStatus', () => {
      const status = InvoiceStatus.create('CANCELLED');
      expect(status.toString()).toBe('CANCELLED');
    });
  });

  describe('state check methods', () => {
    it('should correctly identify DRAFT status', () => {
      const status = InvoiceStatus.draft();
      expect(status.isDraft()).toBe(true);
      expect(status.isPending()).toBe(false);
      expect(status.isPaid()).toBe(false);
      expect(status.isCancelled()).toBe(false);
      expect(status.isOverdue()).toBe(false);
    });

    it('should correctly identify PENDING status', () => {
      const status = InvoiceStatus.pending();
      expect(status.isDraft()).toBe(false);
      expect(status.isPending()).toBe(true);
      expect(status.isPaid()).toBe(false);
      expect(status.isCancelled()).toBe(false);
      expect(status.isOverdue()).toBe(false);
    });

    it('should correctly identify PAID status', () => {
      const status = InvoiceStatus.paid();
      expect(status.isDraft()).toBe(false);
      expect(status.isPending()).toBe(false);
      expect(status.isPaid()).toBe(true);
      expect(status.isCancelled()).toBe(false);
      expect(status.isOverdue()).toBe(false);
    });

    it('should correctly identify CANCELLED status', () => {
      const status = InvoiceStatus.cancelled();
      expect(status.isDraft()).toBe(false);
      expect(status.isPending()).toBe(false);
      expect(status.isPaid()).toBe(false);
      expect(status.isCancelled()).toBe(true);
      expect(status.isOverdue()).toBe(false);
    });

    it('should correctly identify OVERDUE status', () => {
      const status = InvoiceStatus.overdue();
      expect(status.isDraft()).toBe(false);
      expect(status.isPending()).toBe(false);
      expect(status.isPaid()).toBe(false);
      expect(status.isCancelled()).toBe(false);
      expect(status.isOverdue()).toBe(true);
    });
  });
});
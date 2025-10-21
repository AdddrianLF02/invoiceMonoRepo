import { Invoice } from '../../entities/Invoice';
import { CustomerId } from '../../value-objects/CustomerId';
import { InvoiceId } from '../../value-objects/InvoiceId';
import { InvoiceNumber } from '../../value-objects/InvoiceNumber';
import { InvoiceStatus } from '../../value-objects/InvoiceStatus';
import { InvoiceItem } from '../../entities/InvoiceItem';
import { Money } from '../../value-objects/Money';

describe('Invoice', () => {
  // Datos de prueba comunes
  const customerId = CustomerId.create();
  const issueDate = new Date('2023-01-01');
  const dueDate = new Date('2023-01-31');
  const items: InvoiceItem[] = [];

  describe('create', () => {
    it('should create a valid Invoice with default values', () => {
      const invoice = Invoice.create(customerId, issueDate, dueDate);
      
      expect(invoice).toBeInstanceOf(Invoice);
      expect(invoice.getId()).toBeInstanceOf(InvoiceId);
      expect(invoice.getCustomerId()).toBe(customerId);
      expect(invoice.getInvoiceNumber()).toBeInstanceOf(InvoiceNumber);
      expect(invoice.getStatus().getValue()).toBe('DRAFT');
      expect(invoice.getIssueDate()).toEqual(issueDate);
      expect(invoice.getDueDate()).toEqual(dueDate);
      expect(invoice.getItems()).toEqual([]);
      expect(invoice.getCreatedAt()).toBeInstanceOf(Date);
      expect(invoice.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should create a valid Invoice with provided items', () => {
      const mockItem = {} as InvoiceItem; // Mock para la prueba
      const invoice = Invoice.create(customerId, issueDate, dueDate, [mockItem]);
      
      expect(invoice.getItems()).toHaveLength(1);
      expect(invoice.getItems()[0]).toBe(mockItem);
    });

    it('should throw an error when due date is before issue date', () => {
      const invalidDueDate = new Date('2022-12-31'); // Antes de la fecha de emisión
      
      expect(() => {
        Invoice.create(customerId, issueDate, invalidDueDate);
      }).toThrow('Due date cannot be before issue date');
    });
  });

  describe('reconstitute', () => {
    it('should reconstitute an Invoice with all provided values', () => {
      const id = InvoiceId.create();
      const invoiceNumber = InvoiceNumber.create('INV-12345');
      const status = InvoiceStatus.paid();
      const createdAt = new Date('2023-01-01T10:00:00Z');
      const updatedAt = new Date('2023-01-02T10:00:00Z');
      
      const invoice = Invoice.reconstitute(
        id,
        customerId,
        invoiceNumber,
        status,
        issueDate,
        dueDate,
        items,
        createdAt,
        updatedAt
      );
      
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
      const invoice = Invoice.create(customerId, issueDate, dueDate);
      
      expect(invoice.getId()).toBeInstanceOf(InvoiceId);
      expect(invoice.getCustomerId()).toBe(customerId);
      expect(invoice.getInvoiceNumber()).toBeInstanceOf(InvoiceNumber);
      expect(invoice.getStatus().getValue()).toBe('DRAFT');
      expect(invoice.getIssueDate()).toEqual(issueDate);
      expect(invoice.getDueDate()).toEqual(dueDate);
      expect(Array.isArray(invoice.getItems())).toBe(true);
      expect(invoice.getCreatedAt()).toBeInstanceOf(Date);
      expect(invoice.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should return a copy of items array to prevent external modifications', () => {
      const mockItem = {} as InvoiceItem;
      const invoice = Invoice.create(customerId, issueDate, dueDate, [mockItem]);
      
      const items = invoice.getItems();
      items.push({} as InvoiceItem);
      
      expect(invoice.getItems()).toHaveLength(1); // El array original no debe modificarse
    });
  });

  // Pruebas para los métodos de negocio
  describe('business methods', () => {
    it('should mark invoice as paid', () => {
      const invoice = Invoice.create(customerId, issueDate, dueDate);
      
      // Creamos un item para la factura
      const unitPrice = Money.fromFloat(100, 'EUR');
      const quantity = 1;
      const taxRate = 10; // 10%
      
      // Calculamos los valores necesarios
      const subtotal = unitPrice.multiply(quantity);
      const taxAmount = subtotal.multiply(taxRate / 100);
      const total = subtotal.add(taxAmount);
      
      const item = InvoiceItem.create(
        'Item 1',
        quantity,
        unitPrice,
        taxRate,
        subtotal,
        taxAmount,
        total
      );
      
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
        getTotal: jest.fn().mockReturnValue(Money.fromFloat(100, 'EUR'))
      } as unknown as InvoiceItem;
      
      const mockItem2 = {
        getTotal: jest.fn().mockReturnValue(Money.fromFloat(200, 'EUR'))
      } as unknown as InvoiceItem;
      
      const invoice = Invoice.create(customerId, issueDate, dueDate, [mockItem1, mockItem2]);
      const total = invoice.getTotal();
      
      expect(total.getAmountAsFloat()).toBe(300);
      expect(total.getCurrency()).toBe('EUR');
    });

    it('should add item to invoice', () => {
      const invoice = Invoice.create(customerId, issueDate, dueDate);
      const mockItem = {} as InvoiceItem;
      
      const updatedInvoice = invoice.addItem(mockItem);
      
      expect(updatedInvoice.getItems()).toHaveLength(1);
      expect(updatedInvoice.getItems()[0]).toBe(mockItem);
      expect(updatedInvoice).not.toBe(invoice); // Debe ser una nueva instancia
    });
  });
});
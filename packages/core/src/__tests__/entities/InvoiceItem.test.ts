import { InvoiceItem } from '../../entities/InvoiceItem';
import { Money } from '../../value-objects/Money';

describe('InvoiceItem', () => {
  it('should create an invoice item with valid data', () => {
    // Arrange
    const description = 'Test Item';
    const quantity = 2;
    const unitPrice = Money.fromFloat(100);
    const taxRate = 0.21;
    const subtotal = Money.fromFloat(200); // 2 * 100
    const taxAmount = Money.fromFloat(42); // 200 * 0.21
    const total = Money.fromFloat(242); // 200 + 42

    // Act
    const invoiceItem = InvoiceItem.create(
      description,
      quantity,
      unitPrice,
      taxRate,
      subtotal,
      taxAmount,
      total
    );

    // Assert
    expect(invoiceItem).toBeDefined();
    expect(invoiceItem.getDescription()).toBe(description);
    expect(invoiceItem.getQuantity()).toBe(quantity);
    expect(invoiceItem.getUnitPrice().equals(unitPrice)).toBe(true);
    expect(invoiceItem.getTaxRate()).toBe(taxRate);
    expect(invoiceItem.getSubtotal().equals(subtotal)).toBe(true);
    expect(invoiceItem.getTaxAmount().equals(taxAmount)).toBe(true);
    expect(invoiceItem.getTotal().equals(total)).toBe(true);
  });

  it('should throw an error when total does not match subtotal + taxAmount', () => {
    // Arrange
    const description = 'Test Item';
    const quantity = 2;
    const unitPrice = Money.fromFloat(100);
    const taxRate = 0.21;
    const subtotal = Money.fromFloat(200);
    const taxAmount = Money.fromFloat(42);
    const incorrectTotal = Money.fromFloat(250); // Incorrect total

    // Act & Assert
    expect(() => {
      InvoiceItem.create(
        description,
        quantity,
        unitPrice,
        taxRate,
        subtotal,
        taxAmount,
        incorrectTotal
      );
    }).toThrow('Calculated total does not match subtotal + tax amount');
  });
});
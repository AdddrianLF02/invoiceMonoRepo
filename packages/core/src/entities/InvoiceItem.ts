import { Money } from "../value-objects/Money";
import { v4 as uuidv4 } from 'uuid';

export class InvoiceItem {
  private readonly id: string;
  private readonly description: string;
  private readonly quantity: number;
  private readonly unitPrice: Money;
  private readonly taxRate: number;

  public static create(
    description: string,
    quantity: number,
    unitPrice: Money,
    taxRate: number
  ): InvoiceItem {
    return new InvoiceItem(
      uuidv4(),
      description,
      quantity,
      unitPrice,
      taxRate
    );
  }

  public static reconstitute(
    id: string,
    description: string,
    quantity: number,
    unitPrice: Money,
    taxRate: number
  ): InvoiceItem {
    return new InvoiceItem(
      id,
      description,
      quantity,
      unitPrice,
      taxRate
    );
  }

  constructor(
    id: string,
    description: string,
    quantity: number,
    unitPrice: Money,
    taxRate: number
  ) {
    this.validate(description, quantity, taxRate);
    
    this.id = id;
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.taxRate = taxRate;
  }

  public getId(): string {
    return this.id;
  }

  public getDescription(): string {
    return this.description;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getUnitPrice(): Money {
    return this.unitPrice;
  }

  public getTaxRate(): number {
    return this.taxRate;
  }

  public getSubtotal(): Money {
    return this.unitPrice.multiply(this.quantity);
  }

  public getTaxAmount(): Money {
    const subtotal = this.getSubtotal();
    return subtotal.multiply(this.taxRate / 100);
  }

  public getTotal(): Money {
    const subtotal = this.getSubtotal();
    const taxAmount = this.getTaxAmount();
    return subtotal.add(taxAmount);
  }

  private validate(description: string, quantity: number, taxRate: number): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Item description cannot be empty');
    }
    
    if (quantity <= 0) {
      throw new Error('Item quantity must be greater than zero');
    }
    
    if (taxRate < 0) {
      throw new Error('Tax rate cannot be negative');
    }
  }
}
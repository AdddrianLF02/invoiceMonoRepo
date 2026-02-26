import { Money } from "../value-objects/Money";
import { InvoiceItemId } from "../value-objects/InvoiceItemId";

export class InvoiceItem {
 private readonly id: InvoiceItemId;
 private readonly description: string;
 private readonly quantity: number;
 private readonly unitPrice: Money;
 private readonly taxRate: number; // Se mantiene como dato histórico/auditoría
 // Valores calculados y fijos (resultados de la Strategy en la Capa Application)
 private readonly subtotal: Money;
 private readonly taxAmount: Money;
 private readonly total: Money;

 // --- FACTORY METHOD: CREACIÓN (Uso en Casos de Uso) ---
 // Requiere explícitamente los valores calculados por la Strategy externa.
 public static create(
  description: string,
  quantity: number,
  unitPrice: Money,
  taxRate: number,
  subtotal: Money,
  taxAmount: Money,
  total: Money
 ): InvoiceItem {
  // Invariante de Consistencia: Garantizamos que la suma de los componentes sea correcta
  if (!total.equals(subtotal.add(taxAmount))) {
   throw new Error('Calculated total does not match subtotal + tax amount');
  }
 
 return new InvoiceItem(
   InvoiceItemId.create(),
      description,
      quantity,
      unitPrice,
      taxRate,
      subtotal,
      taxAmount,
      total
    )
  }
  
  // --- FACTORY METHOD: RECONSTITUCIÓN (Uso en Repositorios) ---
  public static reconstitute(
    id: string,
    description: string,
    quantity: number,
    unitPrice: Money,
    taxRate: number,
    subtotalInCents: number,
    taxAmountInCents: number,
    totalInCents: number
  ): InvoiceItem {
    // Convertimos de centavos a valor decimal (dividiendo por 100)
    const subtotal = Money.fromFloat(subtotalInCents / 100, unitPrice.getCurrency());
    const taxAmount = Money.fromFloat(taxAmountInCents / 100, unitPrice.getCurrency());
    const total = Money.fromFloat(totalInCents / 100, unitPrice.getCurrency());
    
    return new InvoiceItem(
      InvoiceItemId.fromString(id),
      description,
      quantity,
      unitPrice,
      taxRate,
      subtotal,
      taxAmount,
      total
    );
  }

  // --- CONSTRUCTOR PRIVADO (Con todos los campos) ---
  private constructor(
    id: InvoiceItemId,
    description: string,
    quantity: number,
    unitPrice: Money,
    taxRate: number,
    subtotal: Money,
    taxAmount: Money,
    total: Money
  ) {
    this.validate(description, quantity, taxRate);
    
    this.id = id;
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.taxRate = taxRate;
    this.subtotal = subtotal;
    this.taxAmount = taxAmount;
    this.total = total;
  }

  // --- GETTERS (SOLO DEVUELVEN EL ESTADO ALMACENADO) ---
  
  public getId(): string {
    return this.id.getValue();
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

  // CORREGIDO: Solo devuelve el valor almacenado por la Strategy
  public getSubtotal(): Money {
    return this.subtotal;
  }

  public getTaxAmount(): Money {
    return this.taxAmount;
  }

  // CORREGIDO: Solo devuelve el valor almacenado por la Strategy
  public getTotal(): Money {
    return this.total; 
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
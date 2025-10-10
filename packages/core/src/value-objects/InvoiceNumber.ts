/**
 * Value Object para representar el número de una factura.
 * Encapsula la lógica de validación y formato del número de factura.
 */
export class InvoiceNumber {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): InvoiceNumber {
    if (!value || value.trim().length === 0) {
      throw new Error('Invoice number cannot be empty');
    }
    
    // Aquí podríamos añadir validaciones adicionales según las reglas de negocio
    // Por ejemplo, formato específico, longitud, etc.
    
    return new InvoiceNumber(value);
  }
  
  public static fromString(value: string): InvoiceNumber {
    return InvoiceNumber.create(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other?: InvoiceNumber): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof InvoiceNumber)) {
      return false;
    }
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
import { randomUUID } from 'crypto';

/**
 * Value Object para representar el ID de una factura.
 * Encapsulamos la lógica de negocio relacionada con el ID de la factura.
 */
export class InvoiceId {
  private readonly value: string;

  // Constructor privado para evitar la creación directa de instancias
  private constructor(id: string) {
    this.value = id;
  }

  // Generamos un nuevo UUID para nuevas facturas
  public static create(): InvoiceId {
    return new InvoiceId(randomUUID());
  }

  // Permite reconstruir el ID desde la base de datos.
  public static fromString(id: string): InvoiceId {
    if (!id) {
      throw new Error('InvoiceId cannot be empty');
    }
    return new InvoiceId(id);
  }

  public getValue(): string {
    return this.value;
  }

  // Implementamos comparación por valor, no por referencia.
  public equals(id?: InvoiceId): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof InvoiceId)) {
      return false;
    }
    return this.value === id.value;
  }

  public toString(): string {
    return this.value;
  }
}
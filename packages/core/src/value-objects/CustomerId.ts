import { randomUUID } from 'crypto';
import z from 'zod';

export const CustomerIdSchema = z.string().uuid();
/**
 * Value Object para representar el ID de un cliente.
 * Encapsulamos la lógica de negocio relacionada con el ID del cliente.
 */
export class CustomerId {
  private readonly value: string;

  // Constructor privado para evitar la creación directa de instancias
  private constructor(id: string) {
    this.value = id;
  }

  // Generamos un nuevo UUID para nuevos clientes
  public static create(): CustomerId {
    return new CustomerId(randomUUID());
  }

  // Permite reconstruir el ID desde la base de datos.
  public static fromString(id: string): CustomerId {
    if (!id) {
      throw new Error('CustomerId cannot be empty');
    }
    return new CustomerId(id);
  }

  public getValue(): string {
    return this.value;
  }

  // Implementamos comparación por valor, no por referencia.
  public equals(id?: CustomerId): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof CustomerId)) {
      return false;
    }
    return this.value === id.value;
  }

  public toString(): string {
    return this.value;
  }
}
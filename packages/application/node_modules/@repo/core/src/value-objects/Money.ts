// packages/core/src/value-objects/Money.ts
/**
 * Value Object para representar un valor monetario, utilizando BigInt (céntimos) internamente 
 * para garantizar precisión aritmética, esencial para sistemas financieros (incluso en EUR).
 */
export class Money {
  // Almacenado como céntimos/peniques (ej: 10.99 EUR = 1099n)
  private readonly amountInCents: bigint; 
  private readonly currency: string;

  private constructor(amountInCents: bigint, currency: string = 'EUR') {
    this.amountInCents = amountInCents;
    this.currency = currency;
  }

  // Creación desde un flotante (el input de usuario)
  public static fromFloat(amount: number, currency: string = 'EUR'): Money {
    if (amount < 0) throw new Error('Money amount cannot be negative');
    if (currency !== 'EUR') throw new Error('Only EUR currency is supported in Spain'); // Nuevo chequeo
    
    // Convertir a céntimos y forzar el redondeo BigInt (evitando float precision errors)
    const amountInCents = BigInt(Math.round(amount * 100));
    return new Money(amountInCents, currency);
  }

  public static zero(currency: string = 'EUR'): Money {
    if (currency !== 'EUR') throw new Error('Only EUR currency is supported in Spain');
    return new Money(0n, currency);
  }
  
  // Getter principal para uso en cálculos (devuelve BigInt)
  public getAmountInCents(): bigint {
    return this.amountInCents;
  }
  
  // Getter para representación (devuelve el valor decimal)
  public getAmountAsFloat(): number {
    return Number(this.amountInCents) / 100;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public add(money: Money): Money {
    if (this.currency !== money.currency) throw new Error('Cannot add money with different currencies');
    return new Money(this.amountInCents + money.amountInCents, this.currency);
  }

  public multiply(factor: number): Money {
    if (factor < 0) throw new Error('Cannot multiply by a negative factor');
    
    // Si el factor es la cantidad (entero):
    if (Number.isInteger(factor)) {
        return new Money(this.amountInCents * BigInt(factor), this.currency);
    }
    
    // Si el factor es un porcentaje (float, ej: tasa de impuesto 0.21):
    // Realizamos la multiplicación en número (sólo en este punto) y redondeamos a céntimos.
    const preciseAmount = Number(this.amountInCents) * factor;
    const roundedCents = BigInt(Math.round(preciseAmount));
    
    return new Money(roundedCents, this.currency);
  }

  public equals(other?: Money): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Money)) {
      return false;
    }
    return this.amountInCents === other.amountInCents && this.currency === other.currency;
  }

  public toString(): string {
    // Esto es solo para representación/debugging, no para lógica de negocio.
    return `${this.getAmountAsFloat().toFixed(2)} ${this.currency}`;
  }
}
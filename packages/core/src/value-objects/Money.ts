/**
 * Value Object para representar un valor monetario.
 * Encapsula la lógica de validación y operaciones con importes monetarios.
 */
export class Money {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number, currency: string = 'EUR') {
    this.amount = amount;
    this.currency = currency;
  }

  public static create(amount: number, currency: string = 'EUR'): Money {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }

    if (!currency || currency.trim().length === 0) {
      throw new Error('Currency cannot be empty');
    }

    return new Money(amount, currency);
  }

  public static zero(currency: string = 'EUR'): Money {
    return new Money(0, currency);
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public add(money: Money): Money {
    if (this.currency !== money.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.amount + money.amount, this.currency);
  }

  public subtract(money: Money): Money {
    if (this.currency !== money.currency) {
      throw new Error('Cannot subtract money with different currencies');
    }
    if (this.amount < money.amount) {
      throw new Error('Cannot subtract to a negative amount');
    }
    return new Money(this.amount - money.amount, this.currency);
  }

  public multiply(factor: number): Money {
    if (factor < 0) {
      throw new Error('Cannot multiply by a negative factor');
    }
    return new Money(this.amount * factor, this.currency);
  }

  public equals(other?: Money): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Money)) {
      return false;
    }
    return this.amount === other.amount && this.currency === other.currency;
  }

  public toString(): string {
    return `${this.amount} ${this.currency}`;
  }
}
import { randomUUID } from 'crypto';

export class InvoiceItemId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(): InvoiceItemId {
    return new InvoiceItemId(randomUUID());
  }

  public static fromString(id: string): InvoiceItemId {
    if (!id) {
      throw new Error('InvoiceItemId cannot be empty');
    }
    return new InvoiceItemId(id);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: InvoiceItemId): boolean {
    return this.value === other.value;
  }
}
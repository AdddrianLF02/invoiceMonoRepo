/**
 * Value Object para representar el estado de una factura.
 * Utiliza un enum para limitar los posibles estados.
 */
export enum InvoiceStatusEnum {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE'
}

export class InvoiceStatus {
  private readonly value: InvoiceStatusEnum;

  private constructor(status: InvoiceStatusEnum) {
    this.value = status;
  }

  public static create(status: string): InvoiceStatus {
    if (!Object.values(InvoiceStatusEnum).includes(status as InvoiceStatusEnum)) {
      throw new Error(`Invalid invoice status: ${status}`);
    }
    return new InvoiceStatus(status as InvoiceStatusEnum);
  }

  public static draft(): InvoiceStatus {
    return new InvoiceStatus(InvoiceStatusEnum.DRAFT);
  }

  public static pending(): InvoiceStatus {
    return new InvoiceStatus(InvoiceStatusEnum.PENDING);
  }

  public static paid(): InvoiceStatus {
    return new InvoiceStatus(InvoiceStatusEnum.PAID);
  }

  public static cancelled(): InvoiceStatus {
    return new InvoiceStatus(InvoiceStatusEnum.CANCELLED);
  }

  public static overdue(): InvoiceStatus {
    return new InvoiceStatus(InvoiceStatusEnum.OVERDUE);
  }

  public static fromString(status: string): InvoiceStatus {
    return InvoiceStatus.create(status);
  }

  public getValue(): InvoiceStatusEnum {
    return this.value;
  }

  public equals(other?: InvoiceStatus): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof InvoiceStatus)) {
      return false;
    }
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  public isDraft(): boolean {
    return this.value === InvoiceStatusEnum.DRAFT;
  }

  public isPending(): boolean {
    return this.value === InvoiceStatusEnum.PENDING;
  }

  public isPaid(): boolean {
    return this.value === InvoiceStatusEnum.PAID;
  }

  public isCancelled(): boolean {
    return this.value === InvoiceStatusEnum.CANCELLED;
  }

  public isOverdue(): boolean {
    return this.value === InvoiceStatusEnum.OVERDUE;
  }
}
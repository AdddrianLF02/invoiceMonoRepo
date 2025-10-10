import { CustomerId } from "../value-objects/CustomerId";
import { InvoiceId } from "../value-objects/InvoiceId";
import { InvoiceItem } from "./InvoiceItem";
import { InvoiceNumber } from "../value-objects/InvoiceNumber";
import { InvoiceStatus } from "../value-objects/InvoiceStatus";
import { Money } from "../value-objects/Money";

export class Invoice {
  private readonly id: InvoiceId;
  private readonly customerId: CustomerId;
  private invoiceNumber: InvoiceNumber;
  private status: InvoiceStatus;
  private issueDate: Date;
  private dueDate: Date;
  private items: InvoiceItem[];
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: InvoiceId,
    customerId: CustomerId,
    invoiceNumber: InvoiceNumber,
    status: InvoiceStatus,
    issueDate: Date,
    dueDate: Date,
    items: InvoiceItem[] = [],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.customerId = customerId;
    this.invoiceNumber = invoiceNumber;
    this.status = status;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.items = items;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public static create(
    customerId: CustomerId,
    issueDate: Date,
    dueDate: Date,
    items: InvoiceItem[] = []
  ): Invoice {
    if (dueDate < issueDate) {
      throw new Error('Due date cannot be before issue date');
    }

    // Generamos automáticamente el número de factura
    const invoiceNumber = InvoiceNumber.create(`INV-${Date.now()}`);

    return new Invoice(
      InvoiceId.create(),
      customerId,
      invoiceNumber,
      InvoiceStatus.draft(),
      issueDate,
      dueDate,
      items
    );
  }

  public static reconstitute(
    id: InvoiceId,
    customerId: CustomerId,
    invoiceNumber: InvoiceNumber,
    status: InvoiceStatus,
    issueDate: Date,
    dueDate: Date,
    items: InvoiceItem[] = [],
    createdAt?: Date,
    updatedAt?: Date
  ): Invoice {
    return new Invoice(
      id,
      customerId,
      invoiceNumber,
      status,
      issueDate,
      dueDate,
      items,
      createdAt,
      updatedAt
    );
  }

  // NUEVO MÉTODO AYUDANTE --
  private copyWith(props: {
    customerId?: CustomerId;
    invoiceNumber?: InvoiceNumber;
    status?: InvoiceStatus;
    issueDate?: Date;
    dueDate?: Date;
    items?: InvoiceItem[];
  }): Invoice {
    return new Invoice(
      this.id,
      props.customerId ?? this.customerId,
      props.invoiceNumber ?? this.invoiceNumber,
      props.status ?? this.status,
      props.issueDate ?? this.issueDate,
      props.dueDate ?? this.dueDate,
      props.items ?? this.items,
      this.createdAt,
      new Date()
    )
  }

  // Getters
  public getId(): InvoiceId {
    return this.id;
  }

  public getCustomerId(): CustomerId {
    return this.customerId;
  }

  public getInvoiceNumber(): InvoiceNumber {
    return this.invoiceNumber;
  }

  public getStatus(): InvoiceStatus {
    return this.status;
  }

  public getIssueDate(): Date {
    return this.issueDate;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public getItems(): InvoiceItem[] {
    return [...this.items]; // Devolvemos una copia para evitar modificaciones externas
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // --- MÉTODOS DE COMPORTAMIENTO (AHORA 100% INMUTABLES) ---

  public updateCustomerId(customerId: CustomerId): Invoice {
    if (!this.status.isDraft()) throw new Error('Cannot update customer ID unless invoice is in draft status');
    return this.copyWith({ customerId });
  }

  public updateStatus(status: InvoiceStatus): Invoice {
    // ... tu lógica de validación ...
    return this.copyWith({ status });
  }

  public updateIssueDate(issueDate: Date): Invoice {
    if (!this.status.isDraft()) throw new Error('Cannot update issue date unless invoice is in draft status');
    if (issueDate > this.dueDate) throw new Error('Issue date cannot be after due date');
    return this.copyWith({ issueDate });
  }

  public updateDueDate(dueDate: Date): Invoice {
    if (dueDate < this.issueDate) throw new Error('Due date cannot be before issue date');
    return this.copyWith({ dueDate });
  }

  public updateInvoiceNumber(invoiceNumber: InvoiceNumber): Invoice {
    if (!this.status.isDraft()) throw new Error('Cannot update invoice number unless invoice is in draft status');
    return this.copyWith({ invoiceNumber });
  }

  public addItem(item: InvoiceItem): Invoice {
    if (!this.status.isDraft()) throw new Error('Cannot add items unless invoice is in draft status');
    const newItems = [...this.items, item];
    return this.copyWith({ items: newItems });
  }

  // Refactorizado para ser inmutable y más robusto (usa ID, no índice)
  public removeItem(itemId: string): Invoice {
    if (!this.status.isDraft()) throw new Error('Cannot remove items unless invoice is in draft status');
    const newItems = this.items.filter(item => item.getId() !== itemId);
    if (newItems.length === this.items.length) throw new Error('Invalid item ID');
    return this.copyWith({ items: newItems });
  }

  public clearItems(): Invoice {
    if (!this.status.isDraft()) throw new Error('Cannot clear items unless invoice is in draft status');
    return this.copyWith({ items: [] });
  }

  public markAsPending(): Invoice {
    if (!this.status.isDraft()) throw new Error('Only draft invoices can be marked as pending');
    if (this.items.length === 0) throw new Error('Cannot mark as pending an invoice without items');
    return this.copyWith({ status: InvoiceStatus.pending() });
  }

  public markAsPaid(): Invoice {
    if (!this.status.isPending() && !this.status.isOverdue()) throw new Error('Only pending or overdue invoices can be marked as paid');
    return this.copyWith({ status: InvoiceStatus.paid() });
  }

  public markAsOverdue(): Invoice {
    if (!this.status.isPending()) throw new Error('Only pending invoices can be marked as overdue');
    const today = new Date();
    if (today <= this.dueDate) throw new Error('Cannot mark as overdue an invoice that is not past its due date');
    return this.copyWith({ status: InvoiceStatus.overdue() });
  }

  public cancel(): Invoice {
    if (this.status.isPaid()) throw new Error('Cannot cancel a paid invoice');
    return this.copyWith({ status: InvoiceStatus.cancelled() });
  }

  // Cálculos
  public getSubtotal(): Money {
    if (this.items.length === 0) {
      return Money.zero();
    }
    
    return this.items.reduce(
      (total, item) => total.add(item.getSubtotal()),
      Money.zero()
    );
  }

  public getTaxAmount(): Money {
    if (this.items.length === 0) {
      return Money.zero();
    }
    
    return this.items.reduce(
      (total, item) => total.add(item.getTaxAmount()),
      Money.zero()
    );
  }

  public getTotal(): Money {
    if (this.items.length === 0) {
      return Money.zero();
    }
    
    return this.items.reduce(
      (total, item) => total.add(item.getTotal()),
      Money.zero()
    );
  }
}
import { Invoice } from "@repo/core";

// CREATE
export interface CreateInvoiceOutputPort {
    handle(result: string): void;
}

// DELETE
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}

// GETCUSTOMERINVOICES
export interface GetCustomerInvoicesOutputPort {
    handle(result: Invoice[]): void;
}

// GETINVOICE
export interface GetInvoiceOutPut {
    handle(result: Invoice): void;
}
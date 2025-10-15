import { Invoice } from "@repo/core";

// TOKEN
export const OUTPUT_TOKEN = "outputToken";

// CREATE
export interface CreateInvoiceOutputPort {
    present(result: Invoice): void;
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
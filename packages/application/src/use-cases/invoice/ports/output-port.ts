import { Invoice } from "@repo/core";

// TOKEN
export const OUTPUT_TOKEN = "outputToken";

// CREATE
export interface CreateInvoiceOutputPort {
    present(result: Invoice): void;
}

// DELETE
export interface DeleteInvoiceOutputPort {
    execute(id: string): Promise<void>;
}

// GETCUSTOMERINVOICES
export interface GetCustomerInvoicesOutputPort {
    present(result: Invoice[]): void;
}

// GETINVOICE
export interface GetInvoiceOutPut {
    present(result: Invoice): void;
}
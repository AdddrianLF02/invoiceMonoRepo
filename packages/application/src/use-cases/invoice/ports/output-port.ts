import { Invoice } from "@repo/core";

// TOKEN
export const OUTPUT_TOKEN = "outputToken";

// CREATE
export const CREATE_INVOICE_OUTPUT_TOKEN = "CREATE_INVOICE_OUTPUT_PORT";
export interface CreateInvoiceOutputPort {
    present(result: Invoice): void;
}

// DELETE
export const DELETE_INVOICE_OUTPUT_TOKEN = "DELETE_INVOICE_OUTPUT_TOKEN";
export interface DeleteInvoiceOutputPort {
    present(id: string): void;
}

// UPDATE
export const UPDATE_INVOICE_OUTPUT_TOKEN = "UPDATE_INVOICE_OUTPUT_TOKEN";
export interface UpdateInvoiceOutputPort {
    present(invoice: Invoice): void;
}

// GETCUSTOMERINVOICES
export const GET_CUSTOMER_INVOICES_OUTPUT_TOKEN = "GET_CUSTOMER_INVOICES_OUTPUT_TOKEN";
export interface GetCustomerInvoicesOutputPort {
    present(result: Invoice[]): void;
}

// GETINVOICE
export const GET_INVOICE_OUTPUT_TOKEN = "GET_INVOICE_OUTPUT_TOKEN";
export interface GetInvoiceOutPutPort {
    present(result: Invoice): void;
}
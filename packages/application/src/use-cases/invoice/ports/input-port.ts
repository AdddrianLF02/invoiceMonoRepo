import { CreateInvoiceDto, UpdateInvoiceDto } from "../../../dtos/invoice.zod";


// CREATE
export const CREATE_INVOICE_INPUT_TOKEN = "CREATE_INVOICE_INPUT_TOKEN";
export interface CreateInvoiceInputPort {
    execute(input: CreateInvoiceDto): Promise<void>;
}

// UPDATE
export const UPDATE_INVOICE_INPUT_TOKEN = "UPDATE_INVOICE_INPUT_TOKEN";
export interface UpdateInvoiceInputPort {
    execute(id: string, input: UpdateInvoiceDto): Promise<void>;
}

// DELETE
export const DELETE_INVOICE_INPUT_TOKEN = "DELETE_INVOICE_INPUT_TOKEN";
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}

// GETCUSTOMERINVOICES
export const GET_CUSTOMER_INVOICES_INPUT_TOKEN = "GET_CUSTOMER_INVOICES_INPUT_TOKEN";
export interface GetCustomerInvoicesInputPort {
    execute(customerId: string): Promise<void>;
}


// GETINVOICE
export const GET_INVOICE_INPUT_TOKEN = "GET_INVOICE_INPUT_PORT";
export interface GetInvoiceInputPort {
    execute(id: string): Promise<void>;
}



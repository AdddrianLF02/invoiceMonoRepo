import { CreateInvoiceDto, UpdateInvoiceDto } from "../../../dtos/invoice.zod";

// TOKEN
export const INPUT_TOKEN = "inputToken";

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
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}

// GETCUSTOMERINVOICES
export interface GetCustomerInvoicesInputPort {
    execute(customerId: string): Promise<void>;
}


// GETINVOICE
export interface GetInvoiceInputPort {
    execute(id: string): Promise<void>;
}



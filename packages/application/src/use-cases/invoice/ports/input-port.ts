import { Invoice } from "@repo/core";
import { CreateInvoiceDto } from "../../../dtos/invoice/invoice.zod";

// TOKEN
export const INPUT_TOKEN = "inputToken";

// CREATE
export interface CreateInvoiceInputPort {
    execute(input: CreateInvoiceDto): Promise<void>;
}

// UPDATE

// DELETE
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}

// GETCUSTOMERINVOICES
export interface GetCustomerInvoicesInputPort {
    execute(customerId: string): Promise<Invoice[]>;
}


// GETINVOICE
export interface GetInvoiceInputPort {
    execute(id: string): Promise<Invoice>;
}



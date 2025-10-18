import { CreateInvoiceDto, UpdateInvoiceDto } from "../../../dtos/invoice.zod";
export declare const CREATE_INVOICE_INPUT_TOKEN = "CREATE_INVOICE_INPUT_TOKEN";
export interface CreateInvoiceInputPort {
    execute(input: CreateInvoiceDto): Promise<void>;
}
export declare const UPDATE_INVOICE_INPUT_TOKEN = "UPDATE_INVOICE_INPUT_TOKEN";
export interface UpdateInvoiceInputPort {
    execute(id: string, input: UpdateInvoiceDto): Promise<void>;
}
export declare const DELETE_INVOICE_INPUT_TOKEN = "DELETE_INVOICE_INPUT_TOKEN";
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}
export declare const GET_CUSTOMER_INVOICES_INPUT_TOKEN = "GET_CUSTOMER_INVOICES_INPUT_TOKEN";
export interface GetCustomerInvoicesInputPort {
    execute(customerId: string): Promise<void>;
}
export declare const GET_INVOICE_INPUT_TOKEN = "GET_INVOICE_INPUT_PORT";
export interface GetInvoiceInputPort {
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=input-port.d.ts.map
import { Invoice } from "@repo/core";
export declare const CREATE_INVOICE_OUTPUT_TOKEN = "CREATE_INVOICE_OUTPUT_PORT";
export interface CreateInvoiceOutputPort {
    present(result: Invoice): void;
}
export declare const DELETE_INVOICE_OUTPUT_TOKEN = "DELETE_INVOICE_OUTPUT_TOKEN";
export interface DeleteInvoiceOutputPort {
    present(id: string): void;
}
export declare const UPDATE_INVOICE_OUTPUT_TOKEN = "UPDATE_INVOICE_OUTPUT_TOKEN";
export interface UpdateInvoiceOutputPort {
    present(invoice: Invoice): void;
}
export declare const GET_CUSTOMER_INVOICES_OUTPUT_TOKEN = "GET_CUSTOMER_INVOICES_OUTPUT_TOKEN";
export interface GetCustomerInvoicesOutputPort {
    present(result: Invoice[]): void;
}
export declare const GET_INVOICE_OUTPUT_TOKEN = "GET_INVOICE_OUTPUT_TOKEN";
export interface GetInvoiceOutPutPort {
    present(result: Invoice): void;
}
//# sourceMappingURL=output-port.d.ts.map
import { Invoice } from "@repo/core";
export interface CreateInvoiceOutputPort {
    handle(result: string): void;
}
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}
export interface GetCustomerInvoicesOutputPort {
    handle(result: Invoice[]): void;
}
export interface GetInvoiceOutPut {
    handle(result: Invoice): void;
}
//# sourceMappingURL=output-port.d.ts.map
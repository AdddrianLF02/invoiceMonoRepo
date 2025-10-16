import { Invoice } from "@repo/core";
export declare const OUTPUT_TOKEN = "outputToken";
export interface CreateInvoiceOutputPort {
    present(result: Invoice): void;
}
export interface DeleteInvoiceOutputPort {
    execute(id: string): Promise<void>;
}
export interface GetCustomerInvoicesOutputPort {
    present(result: Invoice[]): void;
}
export interface GetInvoiceOutPut {
    present(result: Invoice): void;
}
//# sourceMappingURL=output-port.d.ts.map
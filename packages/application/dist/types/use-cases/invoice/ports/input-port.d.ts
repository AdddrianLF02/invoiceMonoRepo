import { CreateInvoiceDto } from "../../../dtos/invoice.zod";
export declare const INPUT_TOKEN = "inputToken";
export interface CreateInvoiceInputPort {
    execute(input: CreateInvoiceDto): Promise<void>;
}
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}
export interface GetCustomerInvoicesInputPort {
    execute(customerId: string): Promise<void>;
}
export interface GetInvoiceInputPort {
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=input-port.d.ts.map
import { Invoice } from "@repo/core";
import { CreateInvoiceDto } from "../../../dtos/invoice/invoice.zod";
export interface CreateInvoiceInputPort {
    execute(input: CreateInvoiceDto): Promise<string>;
}
export interface DeleteInvoiceInputPort {
    execute(id: string): Promise<void>;
}
export interface GetCustomerInvoicesInputPort {
    execute(customerId: string): Promise<Invoice[]>;
}
export interface GetInvoiceInputPort {
    execute(id: string): Promise<Invoice>;
}
//# sourceMappingURL=input-port.d.ts.map
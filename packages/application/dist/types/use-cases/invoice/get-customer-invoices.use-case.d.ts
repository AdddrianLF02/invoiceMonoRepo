import { type InvoiceRepository, Invoice } from '@repo/core';
import { GetCustomerInvoicesInputPort } from './ports/input-port';
export declare class GetCustomerInvoicesUseCase implements GetCustomerInvoicesInputPort {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(customerId: string): Promise<Invoice[]>;
}
//# sourceMappingURL=get-customer-invoices.use-case.d.ts.map
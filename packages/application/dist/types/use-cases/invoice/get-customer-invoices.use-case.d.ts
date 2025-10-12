import { type InvoiceRepository, Invoice } from '@repo/core';
export declare class GetCustomerInvoicesUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(customerId: string): Promise<Invoice[]>;
}
//# sourceMappingURL=get-customer-invoices.use-case.d.ts.map
import { type InvoiceRepository, Invoice } from '@repo/core';
export declare class GetInvoiceUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(id: string): Promise<Invoice>;
}
//# sourceMappingURL=get-invoice.use-case.d.ts.map
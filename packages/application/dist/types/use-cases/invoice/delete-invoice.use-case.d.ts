import { type InvoiceRepository } from '@repo/core';
export declare class DeleteInvoiceUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=delete-invoice.use-case.d.ts.map
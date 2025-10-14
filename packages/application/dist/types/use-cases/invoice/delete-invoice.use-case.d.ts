import { type InvoiceRepository } from '@repo/core';
import { DeleteInvoiceInputPort } from './ports/input-port';
export declare class DeleteInvoiceUseCase implements DeleteInvoiceInputPort {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=delete-invoice.use-case.d.ts.map
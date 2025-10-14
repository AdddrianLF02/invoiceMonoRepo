import { type InvoiceRepository, Invoice } from '@repo/core';
import { GetInvoiceInputPort } from './ports/input-port';
export declare class GetInvoiceUseCase implements GetInvoiceInputPort {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(id: string): Promise<Invoice>;
}
//# sourceMappingURL=get-invoice.use-case.d.ts.map
import { type InvoiceRepository } from '@repo/core';
import { GetInvoiceInputPort } from './ports/input-port';
import { type GetInvoiceOutPutPort } from './ports/output-port';
export declare class GetInvoiceUseCase implements GetInvoiceInputPort {
    private readonly invoiceRepository;
    private readonly outputPort;
    constructor(invoiceRepository: InvoiceRepository, outputPort: GetInvoiceOutPutPort);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=get-invoice.use-case.d.ts.map
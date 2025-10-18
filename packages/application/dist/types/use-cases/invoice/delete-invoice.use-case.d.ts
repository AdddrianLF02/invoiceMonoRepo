import { type InvoiceRepository } from '@repo/core';
import { DeleteInvoiceInputPort } from './ports/input-port';
import { type DeleteInvoiceOutputPort } from './ports/output-port';
export declare class DeleteInvoiceUseCase implements DeleteInvoiceInputPort {
    private readonly invoiceRepository;
    private readonly outputPort;
    constructor(invoiceRepository: InvoiceRepository, outputPort: DeleteInvoiceOutputPort);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=delete-invoice.use-case.d.ts.map
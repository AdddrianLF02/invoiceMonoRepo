import { type InvoiceRepository, type ITaxCalculationStrategy } from '@repo/core';
import { UpdateInvoiceDto } from '../../dtos/invoice.zod';
import { type UpdateInvoiceOutputPort } from './ports/output-port';
export declare class UpdateInvoiceUseCase {
    private readonly invoiceRepository;
    private readonly taxCalculationStrategy;
    private readonly outputPort;
    constructor(invoiceRepository: InvoiceRepository, taxCalculationStrategy: ITaxCalculationStrategy, outputPort: UpdateInvoiceOutputPort);
    execute(id: string, input: UpdateInvoiceDto): Promise<void>;
}
//# sourceMappingURL=update-invoice.use-case.d.ts.map
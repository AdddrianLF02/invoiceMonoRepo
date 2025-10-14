import { type InvoiceRepository, Invoice, type ITaxCalculationStrategy } from '@repo/core';
import { UpdateInvoiceDto } from '../../dtos/invoice/invoice.zod';
export declare class UpdateInvoiceUseCase {
    private readonly invoiceRepository;
    private readonly taxCalculationStrategy;
    constructor(invoiceRepository: InvoiceRepository, taxCalculationStrategy: ITaxCalculationStrategy);
    execute(id: string, input: UpdateInvoiceDto): Promise<Invoice>;
}
//# sourceMappingURL=update-invoice.use-case.d.ts.map
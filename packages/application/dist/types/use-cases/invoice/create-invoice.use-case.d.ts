import { type InvoiceRepository } from '@repo/core';
import { CreateInvoiceDto } from '../../dtos/invoice/invoice.zod';
export declare class CreateInvoiceUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(input: CreateInvoiceDto): Promise<string>;
}
//# sourceMappingURL=create-invoice.use-case.d.ts.map
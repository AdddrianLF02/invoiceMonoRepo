import { type InvoiceRepository, Invoice } from '@repo/core';
import { UpdateInvoiceDto } from '../../dtos/invoice/invoice.zod';
export declare class UpdateInvoiceUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    execute(id: string, input: UpdateInvoiceDto): Promise<Invoice>;
}
//# sourceMappingURL=update-invoice.use-case.d.ts.map
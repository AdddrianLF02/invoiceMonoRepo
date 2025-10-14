import { type InvoiceRepository, type ITaxCalculationStrategy } from '@repo/core';
import { CreateInvoiceDto } from '../../dtos/invoice/invoice.zod';
import { CreateInvoiceInputPort } from './ports/input-port';
export declare class CreateInvoiceUseCase implements CreateInvoiceInputPort {
    private readonly invoiceRepository;
    private readonly taxCalculationStrategy;
    constructor(invoiceRepository: InvoiceRepository, taxCalculationStrategy: ITaxCalculationStrategy);
    execute(input: CreateInvoiceDto): Promise<string>;
}
//# sourceMappingURL=create-invoice.use-case.d.ts.map
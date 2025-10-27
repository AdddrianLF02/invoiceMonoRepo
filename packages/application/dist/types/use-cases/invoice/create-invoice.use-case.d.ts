import { type ITaxCalculationStrategy, type IUnitOfWork } from '@repo/core';
import { CreateInvoiceDto } from '../../dtos/invoice.zod';
import { CreateInvoiceInputPort } from './ports/input-port';
import { type CreateInvoiceOutputPort } from './ports/output-port';
export declare class CreateInvoiceUseCase implements CreateInvoiceInputPort {
    private readonly uow;
    private readonly taxCalculationStrategy;
    private readonly outputPort;
    constructor(uow: IUnitOfWork, taxCalculationStrategy: ITaxCalculationStrategy, outputPort: CreateInvoiceOutputPort);
    execute(userId: string, input: CreateInvoiceDto): Promise<void>;
}
//# sourceMappingURL=create-invoice.use-case.d.ts.map
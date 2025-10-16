import { type InvoiceRepository } from '@repo/core';
import { GetCustomerInvoicesInputPort } from './ports/input-port';
import { type GetCustomerInvoicesOutputPort } from './ports/output-port';
export declare class GetCustomerInvoicesUseCase implements GetCustomerInvoicesInputPort {
    private readonly invoiceRepository;
    private readonly outputPort;
    constructor(invoiceRepository: InvoiceRepository, outputPort: GetCustomerInvoicesOutputPort);
    execute(customerId: string): Promise<void>;
}
//# sourceMappingURL=get-customer-invoices.use-case.d.ts.map
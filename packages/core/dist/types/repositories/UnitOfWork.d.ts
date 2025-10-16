import { CustomerRepository } from "./CustomerRepository";
import { InvoiceRepository } from "./InvoiceRepository";
export interface IUnitOfWork {
    UOW_TOKEN: symbol;
    readonly invoiceRepository: InvoiceRepository;
    readonly customerRepository: CustomerRepository;
    executeTransaction<T>(callback: () => Promise<T>): Promise<T>;
}
export declare const UNIT_OF_WORK: unique symbol;
//# sourceMappingURL=UnitOfWork.d.ts.map
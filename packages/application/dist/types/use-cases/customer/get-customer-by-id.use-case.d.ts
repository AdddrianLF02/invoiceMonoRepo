import { Customer, type CustomerRepository } from '@repo/core';
import { GetCustomerByIdInputPort } from './ports/input-port';
export declare class GetCustomerByIdUseCase implements GetCustomerByIdInputPort {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(id: string): Promise<Customer | null>;
}
//# sourceMappingURL=get-customer-by-id.use-case.d.ts.map
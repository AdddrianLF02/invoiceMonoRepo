import { Customer, type CustomerRepository } from '@repo/core';
import { GetCustomerByEmailInputPort } from './ports/input-port';
export declare class GetCustomerByEmailUseCase implements GetCustomerByEmailInputPort {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(email: string): Promise<Customer | null>;
}
//# sourceMappingURL=get-customer-by-email.use-case.d.ts.map
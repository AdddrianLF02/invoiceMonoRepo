import { Customer, type CustomerRepository } from '@repo/core';
export declare class GetCustomerByEmailUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(email: string): Promise<Customer | null>;
}
//# sourceMappingURL=get-customer-by-email.use-case.d.ts.map
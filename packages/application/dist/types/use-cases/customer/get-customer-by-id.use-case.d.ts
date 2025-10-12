import { Customer, type CustomerRepository } from '@repo/core';
export declare class GetCustomerByIdUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(id: string): Promise<Customer | null>;
}
//# sourceMappingURL=get-customer-by-id.use-case.d.ts.map
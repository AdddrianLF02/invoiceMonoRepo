import 'reflect-metadata';
import { Customer, type CustomerRepository } from '@repo/core';
export interface CreateCustomerInput {
    userId: string;
    name: string;
    email: string;
    number?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    taxId?: string;
    taxIdType?: string;
}
export declare class CreateCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(input: CreateCustomerInput): Promise<Customer>;
}
//# sourceMappingURL=create-customer.use-case.d.ts.map
import { Customer, type CustomerRepository } from '@repo/core';
export interface UpdateCustomerInput {
    id: string;
    name?: string;
    email?: string;
    number?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    taxId?: string;
    isActive?: boolean;
}
export declare class UpdateCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    execute(input: UpdateCustomerInput): Promise<Customer>;
}
//# sourceMappingURL=update-customer.use-case.d.ts.map
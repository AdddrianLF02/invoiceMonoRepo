import { type CustomerRepository } from '@repo/core';
import { GetCustomerByEmailInputPort } from './ports/input-port';
import { type GetCustomerByEmailOutputPort } from './ports/output-port';
export declare class GetCustomerByEmailUseCase implements GetCustomerByEmailInputPort {
    private readonly customerRepository;
    private readonly outputPort;
    constructor(customerRepository: CustomerRepository, outputPort: GetCustomerByEmailOutputPort);
    execute(email: string): Promise<void>;
}
//# sourceMappingURL=get-customer-by-email.use-case.d.ts.map
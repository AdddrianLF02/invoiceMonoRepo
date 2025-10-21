import { type CustomerRepository } from '@repo/core';
import { GetCustomerByIdInputPort } from './ports/input-port';
import { type GetCustomerByIdOutputPort } from './ports/output-port';
export declare class GetCustomerByIdUseCase implements GetCustomerByIdInputPort {
    private readonly customerRepository;
    private readonly outputPort;
    constructor(customerRepository: CustomerRepository, outputPort: GetCustomerByIdOutputPort);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=get-customer-by-id.use-case.d.ts.map
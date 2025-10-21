import 'reflect-metadata';
import { type IUnitOfWork } from '@repo/core';
import { CreateCustomerDto } from '../../dtos/customer.zod';
import { CreateCustomerInputPort } from './ports/input-port';
import { type CreateCustomerOutputPort } from './ports/output-port';
export declare class CreateCustomerUseCase implements CreateCustomerInputPort {
    private readonly uow;
    private readonly outputPort;
    constructor(uow: IUnitOfWork, outputPort: CreateCustomerOutputPort);
    execute(input: CreateCustomerDto): Promise<void>;
}
//# sourceMappingURL=create-customer.use-case.d.ts.map
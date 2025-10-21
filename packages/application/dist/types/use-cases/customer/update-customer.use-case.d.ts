import { type IUnitOfWork } from '@repo/core';
import { UpdateCustomerDto } from '../../dtos/customer.zod';
import { UpdateCustomerInputPort } from './ports/input-port';
import { type UpdateCustomerOutputPort } from './ports/output-port';
export declare class UpdateCustomerUseCase implements UpdateCustomerInputPort {
    private readonly uow;
    private readonly outputPort;
    constructor(uow: IUnitOfWork, outputPort: UpdateCustomerOutputPort);
    execute(input: UpdateCustomerDto): Promise<void>;
}
//# sourceMappingURL=update-customer.use-case.d.ts.map
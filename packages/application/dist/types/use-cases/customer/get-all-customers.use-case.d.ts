import { GetAllCustomersInputPort, type GetAllCustomersOutputPort } from './ports';
import { type IUnitOfWork } from '@repo/core';
export declare class GetAllCustomersUseCase implements GetAllCustomersInputPort {
    private readonly uow;
    private readonly outputPort;
    constructor(uow: IUnitOfWork, outputPort: GetAllCustomersOutputPort);
    execute(userId: string): Promise<void>;
}
//# sourceMappingURL=get-all-customers.use-case.d.ts.map
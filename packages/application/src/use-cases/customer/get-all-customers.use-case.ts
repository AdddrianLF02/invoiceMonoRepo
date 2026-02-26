import { GetAllCustomersInputPort, type GetAllCustomersOutputPort } from './ports';
import { type IUnitOfWork, UserId } from '@repo/core';

export class GetAllCustomersUseCase implements GetAllCustomersInputPort {
    constructor(
        private readonly uow: IUnitOfWork,
        private readonly outputPort: GetAllCustomersOutputPort,
    ) { }

    async execute(userId: string): Promise<void> {
        const uid = UserId.fromString(userId);
        const customers = await this.uow.customerRepository.findByUserId(uid);
        this.outputPort.present(customers)
    }
}
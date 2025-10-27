import { Inject, Injectable } from '@nestjs/common'
import { GET_ALL_CUSTOMERS_OUTPUT_TOKEN, GetAllCustomersInputPort, type GetAllCustomersOutputPort } from './ports';
import { type IUnitOfWork, UNIT_OF_WORK, UserId } from '@repo/core';

@Injectable()
export class GetAllCustomersUseCase implements GetAllCustomersInputPort {
    constructor(
        @Inject(UNIT_OF_WORK)
        private readonly uow: IUnitOfWork,
        @Inject(GET_ALL_CUSTOMERS_OUTPUT_TOKEN)
        private readonly outputPort: GetAllCustomersOutputPort,
    ) {}

    async execute(userId: string): Promise<void> {
        const uid = UserId.fromString(userId);
        const customers = await this.uow.customerRepository.findByUserId(uid);
        this.outputPort.present(customers)
    }
}
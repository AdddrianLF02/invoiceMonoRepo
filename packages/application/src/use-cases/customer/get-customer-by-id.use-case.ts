import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  CustomerId
} from '@repo/core';
import { GetCustomerByIdInputPort } from './ports/input-port';
import { GET_CUSTOMER_BY_ID_OUTPUT_TOKEN, type GetCustomerByIdOutputPort } from './ports/output-port';

@Injectable()
export class GetCustomerByIdUseCase implements GetCustomerByIdInputPort {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
    
    @Inject(GET_CUSTOMER_BY_ID_OUTPUT_TOKEN)
    private readonly outputPort: GetCustomerByIdOutputPort
  ) {}

  async execute(id: string): Promise<void> {
    const customerId = CustomerId.fromString(id);
    const customer = await this.customerRepository.findById(customerId);
    this.outputPort.present(customer);
  }
}
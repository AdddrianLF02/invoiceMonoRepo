import {
  type CustomerRepository,
  CustomerId
} from '@repo/core';
import { GetCustomerByIdInputPort } from './ports/input-port';
import { type GetCustomerByIdOutputPort } from './ports/output-port';

export class GetCustomerByIdUseCase implements GetCustomerByIdInputPort {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly outputPort: GetCustomerByIdOutputPort
  ) { }

  async execute(id: string): Promise<void> {
    const customerId = CustomerId.fromString(id);
    const customer = await this.customerRepository.findById(customerId);
    this.outputPort.present(customer);
  }
}
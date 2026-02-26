import {
  type CustomerRepository,
  Email,
} from '@repo/core';
import { GetCustomerByEmailInputPort } from './ports/input-port';
import { GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN, type GetCustomerByEmailOutputPort } from './ports/output-port';

export class GetCustomerByEmailUseCase implements GetCustomerByEmailInputPort {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly outputPort: GetCustomerByEmailOutputPort
  ) { }

  async execute(email: string): Promise<void> {
    const customerEmail = Email.create(email);
    const customer = await this.customerRepository.findByEmail(customerEmail);
    this.outputPort.present(customer);
  }
}
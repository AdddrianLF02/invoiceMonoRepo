import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  Email,
} from '@repo/core';
import { GetCustomerByEmailInputPort } from './ports/input-port';
import { GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN, GetCustomerByEmailOutputPort } from './ports/output-port';

@Injectable()
export class GetCustomerByEmailUseCase implements GetCustomerByEmailInputPort {
  constructor(
     @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
    
    @Inject(GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN)
    private readonly outputPort: GetCustomerByEmailOutputPort
  ) {}

  async execute(email: string): Promise<void> {
    const customerEmail = Email.create(email);
    const customer = await this.customerRepository.findByEmail(customerEmail);
    this.outputPort.present(customer);
  }
}
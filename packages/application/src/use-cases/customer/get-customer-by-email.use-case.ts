import { Inject, Injectable } from '@nestjs/common';
import {
  Customer,
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  Email,
} from '@repo/core';
import { GetCustomerByEmailInputPort } from './ports/input-port';

@Injectable()
export class GetCustomerByEmailUseCase implements GetCustomerByEmailInputPort {
  constructor(
     @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(email: string): Promise<Customer | null> {
    const customerEmail = Email.create(email);
    return this.customerRepository.findByEmail(customerEmail);
  }
}
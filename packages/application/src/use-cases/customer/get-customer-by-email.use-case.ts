import { Inject, Injectable } from '@nestjs/common';
import {
  Customer,
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  Email,
} from '@repo/core';

@Injectable()
export class GetCustomerByEmailUseCase {
  constructor(
     @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(email: string): Promise<Customer | null> {
    const customerEmail = Email.create(email);
    return this.customerRepository.findByEmail(customerEmail);
  }
}
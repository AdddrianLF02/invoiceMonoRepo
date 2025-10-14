import { Inject, Injectable } from '@nestjs/common';
import {
  Customer,
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  CustomerId
} from '@repo/core';
import { GetCustomerByIdInputPort } from './ports/input-port';

@Injectable()
export class GetCustomerByIdUseCase implements GetCustomerByIdInputPort {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(id: string): Promise<Customer | null> {
    const customerId = CustomerId.create();
    return this.customerRepository.findById(customerId);
  }
}
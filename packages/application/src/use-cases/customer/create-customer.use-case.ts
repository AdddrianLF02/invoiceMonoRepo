import 'reflect-metadata'
import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  Customer,
  UNIT_OF_WORK,
  type IUnitOfWork,
  Address,
  Email,
  TaxId,
  UserId
} from '@repo/core'; 
import { CreateCustomerDto } from '../../dtos/customer.zod';
import { CreateCustomerInputPort } from './ports/input-port';
import { CREATE_CUSTOMER_OUTPUT_TOKEN, type CreateCustomerOutputPort } from './ports/output-port';

@Injectable()
export class CreateCustomerUseCase implements CreateCustomerInputPort {
  constructor(
      @Inject(UNIT_OF_WORK)
      private readonly uow: IUnitOfWork,

      @Inject(CREATE_CUSTOMER_OUTPUT_TOKEN)
      private readonly outputPort: CreateCustomerOutputPort
  ) {}

  async execute(input: CreateCustomerDto): Promise<void> {
    await this.uow.executeTransaction(async () => {
      const repo = this.uow.customerRepository;
      const email = Email.create(input.email);
      
      const existingCustomer = await repo.findByEmail(email);
      if (existingCustomer) {
        throw new ConflictException('Ya existe un cliente con este email');
      }

      // Creamos el Value Object para el UserId
      const userId = UserId.fromString(input.userId);

      const address = Address.create(
        input.street || '',
        input.city || '',
        input.postalCode || '',
        input.country || ''
      );

      const taxId = input.taxId 
        ? TaxId.create(input.taxId) 
        : undefined;

      // Creamos el cliente
      const customer = Customer.create(
        userId,
        input.name,
        email,
        address,
        input.number || '',
        taxId
      );

      await repo.create(customer);
      this.outputPort.present(customer);
    });
  }
}
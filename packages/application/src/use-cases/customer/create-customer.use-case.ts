import 'reflect-metadata'
import { Inject, Injectable, ConflictException, NotFoundException } from '@nestjs/common';
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

      // Creamos el Value Object para el UserId
      const userId = UserId.fromString(input.userId);

      // Verify that the user exists to avoid FK violation
      const userExists = await this.uow.userRepository.findById(userId);
      if (!userExists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Validar que el email no esté ya en uso dentro del mismo usuario (multi-tenant)
      const existingForUser = await repo.findByUserId(userId);
      const emailInUse = existingForUser.some(c => c.getEmail().equals(email));
      if (emailInUse) {
        throw new ConflictException('El email ya está en uso por otro cliente de este usuario');
      }

      const address = Address.create(
        input.address?.street,
        input.address?.city,
        input.address?.postalCode,
        input.address?.country
      );

      const taxId = input.taxId 
        ? TaxId.create(input.taxId) 
        : undefined;

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
import {
  Customer,
  type IUnitOfWork,
  Address,
  Email,
  TaxId,
  UserId
} from '@repo/core';
import { CreateCustomerDto } from '../../dtos/customer.zod';
import { CreateCustomerInputPort } from './ports/input-port';
import { CREATE_CUSTOMER_OUTPUT_TOKEN, type CreateCustomerOutputPort } from './ports/output-port';

export class CreateCustomerUseCase implements CreateCustomerInputPort {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly outputPort: CreateCustomerOutputPort
  ) { }

  async execute(input: CreateCustomerDto): Promise<void> {
    await this.uow.executeTransaction(async () => {
      const repo = this.uow.customerRepository;
      const email = Email.create(input.email as string);

      // Creamos el Value Object para el UserId
      const userId = UserId.fromString(input.userId as string);

      // Verify that the user exists to avoid FK violation
      const userExists = await this.uow.userRepository.findById(userId);
      if (!userExists) {
        throw new Error('NOT_FOUND: Usuario no encontrado');
      }

      // Validar que el email no esté ya en uso dentro del mismo usuario (multi-tenant)
      const existingForUser = await repo.findByUserId(userId);
      const emailInUse = existingForUser.some(c => c.getEmail().equals(email));
      if (emailInUse) {
        throw new Error('CONFLICT: El email ya está en uso por otro cliente de este usuario');
      }

      const address = Address.create(
        (input.address as any)?.street,
        (input.address as any)?.city,
        (input.address as any)?.postalCode,
        (input.address as any)?.country
      );

      const taxId = input.taxId
        ? TaxId.create(input.taxId as string)
        : undefined;

      const customer = Customer.create(
        userId,
        input.name as string,
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
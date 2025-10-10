import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  Customer,
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  Address,
  Email,
  TaxId,
  UserId
} from '@repo/core'; 

// 1. Añadimos 'userId' al input del caso de uso
export interface CreateCustomerInput {
  userId: string;
  name: string;
  email: string;
  number?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  taxId?: string;
  taxIdType?: string;
}

@Injectable()
export class CreateCustomerUseCase {
  constructor(
      @Inject(CUSTOMER_REPOSITORY)
      private readonly customerRepository: CustomerRepository
  ) {}

  async execute(input: CreateCustomerInput): Promise<Customer> {
    const email = Email.create(input.email);
    
    const existingCustomer = await this.customerRepository.findByEmail(email);
    if (existingCustomer) {
      // Usamos una excepción de NestJS para un mejor manejo de errores
      throw new ConflictException('Ya existe un cliente con este email');
    }

    // 2. Creamos el Value Object para el UserId
    const userId = UserId.fromString(input.userId);

    const address = Address.create(
      input.street || '',
      input.city || '',
      input.postalCode || '',
      input.country || ''
    );

    const taxId = TaxId.create(input.taxId || '');
    
    // 3. Pasamos el 'userId' al crear la entidad Customer
    const customer = Customer.create(
      userId,
      input.name,
      email,
      address, // Reutilizamos la variable, más limpio
      input.number || '',
      taxId,    // Reutilizamos la variable
    );

    return this.customerRepository.create(customer);
  }
}
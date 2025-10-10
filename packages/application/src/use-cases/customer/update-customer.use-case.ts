import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import {
  Customer,
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
  Address,
  Email,
  TaxId,
  CustomerId
} from '@repo/core';

export interface UpdateCustomerInput {
  id: string;
  name?: string;
  email?: string;
  number?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  taxId?: string;
  isActive?: boolean;
}

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
      @Inject(CUSTOMER_REPOSITORY)
      private readonly customerRepository: CustomerRepository
  ) {}

  async execute(input: UpdateCustomerInput): Promise<Customer> {
    const customerId = CustomerId.fromString(input.id);
    
    // 1. Obtenemos la entidad de dominio original
    let customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // --- ENCADENANDO ACTUALIZACIONES INMUTABLES ---
    // Cada 'update' devuelve una nueva instancia de 'customer'

    if (input.name !== undefined) {
      customer = customer.updateName(input.name);
    }

    if (input.number !== undefined) {
      customer = customer.updateNumber(input.number);
    }

    if (input.email !== undefined) {
      const newEmail = Email.create(input.email);
      // Verificamos que el nuevo email no esté en uso por otro cliente
      const existing = await this.customerRepository.findByEmail(newEmail);
      if (existing && !existing.getId().equals(customerId)) {
        throw new ConflictException('El email ya está en uso por otro cliente');
      }
      customer = customer.updateEmail(newEmail);
    }

    // Si se actualiza cualquier parte de la dirección, creamos un nuevo Value Object
    if (input.street !== undefined || input.city !== undefined || input.postalCode !== undefined || input.country !== undefined) {
      const newAddress = Address.create(
        input.street ?? customer.getAddress().getStreet(),
        input.city ?? customer.getAddress().getCity(),
        input.postalCode ?? customer.getAddress().getPostalCode(),
        input.country ?? customer.getAddress().getCountry()
      );
      customer = customer.updateAddress(newAddress);
    }
    
    if (input.taxId !== undefined) {
        const newTaxId = TaxId.create(input.taxId);
        customer = customer.updateTaxId(newTaxId);
    }

    if (input.isActive === true) {
        customer = customer.activate();
    } else if (input.isActive === false) {
        customer = customer.deactivate();
    }
    
    // 2. Persistimos la versión final y actualizada de la entidad
    return this.customerRepository.update(customer);
  }
}
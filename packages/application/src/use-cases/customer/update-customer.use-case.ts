import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import {
  Customer,
  UNIT_OF_WORK,
  type IUnitOfWork,
  Address,
  Email,
  TaxId,
  CustomerId
} from '@repo/core';
import { UpdateCustomerDto } from '../../dtos/customer.zod';
import { UpdateCustomerInputPort } from './ports/input-port';
import { UPDATE_CUSTOMER_OUTPUT_TOKEN, type UpdateCustomerOutputPort } from './ports/output-port';

@Injectable()
export class UpdateCustomerUseCase implements UpdateCustomerInputPort {
  constructor(
      @Inject(UNIT_OF_WORK)
      private readonly uow: IUnitOfWork,
      
      @Inject(UPDATE_CUSTOMER_OUTPUT_TOKEN)
      private readonly outputPort: UpdateCustomerOutputPort
  ) {}

  async execute(input: UpdateCustomerDto): Promise<void> {
    await this.uow.executeTransaction(async () => {
      const repo = this.uow.customerRepository;
      const customerId = CustomerId.fromString(input.id);
      
      // Obtenemos la entidad de dominio original
      let customer = await repo.findById(customerId);
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
        // Verificamos que el nuevo email no esté en uso por otro cliente del mismo usuario
        const customersOfUser = await repo.findByUserId(customer.getUserId());
        const emailInUseByAnother = customersOfUser.some(c => c.getEmail().equals(newEmail) && !c.getId().equals(customerId));
        if (emailInUseByAnother) {
          throw new ConflictException('El email ya está en uso por otro cliente de este usuario');
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
      
      // Persistimos la versión final y actualizada de la entidad
      await repo.update(customer);
      this.outputPort.present(customer);
    });
  }
}
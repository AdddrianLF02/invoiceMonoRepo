import {
  Customer,
  type IUnitOfWork,
  Address,
  Email,
  TaxId,
  CustomerId
} from '@repo/core';
import { UpdateCustomerDto } from '../../dtos/customer.zod';
import { UpdateCustomerInputPort } from './ports/input-port';
import { UPDATE_CUSTOMER_OUTPUT_TOKEN, type UpdateCustomerOutputPort } from './ports/output-port';

export class UpdateCustomerUseCase implements UpdateCustomerInputPort {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly outputPort: UpdateCustomerOutputPort
  ) { }

  async execute(id: string, input: UpdateCustomerDto): Promise<void> {
    await this.uow.executeTransaction(async () => {
      const repo = this.uow.customerRepository;
      const customerId = CustomerId.fromString(id);

      // Obtenemos la entidad de dominio original
      let customer = await repo.findById(customerId);
      if (!customer) {
        throw new Error('NOT_FOUND: Cliente no encontrado');
      }

      // --- ENCADENANDO ACTUALIZACIONES INMUTABLES ---
      // Cada 'update' devuelve una nueva instancia de 'customer'

      if (input.name !== undefined) {
        customer = customer.updateName(input.name as string);
      }

      if (input.number !== undefined) {
        customer = customer.updateNumber(input.number as string);
      }

      if (input.email !== undefined) {
        const newEmail = Email.create(input.email as string);
        // Verificamos que el nuevo email no esté en uso por otro cliente del mismo usuario
        const customersOfUser = await repo.findByUserId(customer.getUserId());
        const emailInUseByAnother = customersOfUser.some(c => c.getEmail().equals(newEmail) && !c.getId().equals(customerId));
        if (emailInUseByAnother) {
          throw new Error('CONFLICT: El email ya está en uso por otro cliente de este usuario');
        }
        customer = customer.updateEmail(newEmail);
      }

      // Si se actualiza cualquier parte de la dirección, creamos un nuevo Value Object
      if (input.address !== undefined) {
        const newAddress = Address.create(
          (input.address as any).street ?? customer.getAddress().getStreet(),
          (input.address as any).city ?? customer.getAddress().getCity(),
          (input.address as any).postalCode ?? customer.getAddress().getPostalCode(),
          (input.address as any).country ?? customer.getAddress().getCountry()
        );
        customer = customer.updateAddress(newAddress);
      }

      if (input.taxId !== undefined) {
        const newTaxId = TaxId.create(input.taxId as string);
        customer = customer.updateTaxId(newTaxId);
      }

      if (input.active === true) {
        customer = customer.activate();
      } else if (input.active === false) {
        customer = customer.deactivate();
      }

      // Persistimos la versión final y actualizada de la entidad
      await repo.update(customer);
      this.outputPort.present(customer);
    });
  }
}
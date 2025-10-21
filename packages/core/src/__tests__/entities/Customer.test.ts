import { Customer } from "../../entities/Customer";
import { Address } from "../../value-objects/Address";
import { CustomerId } from "../../value-objects/CustomerId";
import { Email } from "../../value-objects/Email";
import { TaxId } from "../../value-objects/TaxId";
import { UserId } from "../../value-objects/UserId";

describe('Customer Entity', () => {
  // Valores comunes para las pruebas
  const userId = UserId.create();
  const name = "Empresa Test S.L.";
  const email = Email.create("test@empresa.com");
  const address = Address.create("Calle Test 123", "Madrid", "28001", "España");
  const number = "C-12345";
  const taxId = TaxId.create("B12345678");

  describe('create method', () => {
    it('should create a valid customer with all required fields', () => {
      const customer = Customer.create(
        userId,
        name,
        email,
        address,
        number,
        taxId
      );

      expect(customer.getId()).toBeDefined();
      expect(customer.getUserId()).toBe(userId);
      expect(customer.getName()).toBe(name);
      expect(customer.getEmail()).toBe(email);
      expect(customer.getAddress()).toBe(address);
      expect(customer.getNumber()).toBe(number);
      expect(customer.getTaxId()).toBe(taxId);
      expect(customer.getActive()).toBe(true);
      expect(customer.getCreatedAt()).toBeInstanceOf(Date);
      expect(customer.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should throw error when name is empty', () => {
      expect(() => {
        Customer.create(
          userId,
          "",
          email,
          address,
          number,
          taxId
        );
      }).toThrow("Customer name cannot be empty");
    });
  });

  describe('reconstitute method', () => {
    it('should reconstitute a customer from existing data', () => {
      const id = CustomerId.create();
      const createdAt = new Date(2023, 0, 1);
      const updatedAt = new Date(2023, 0, 2);
      const active = false;

      const customer = Customer.reconstitute(
        id,
        userId,
        name,
        email,
        number,
        address,
        taxId,
        active,
        createdAt,
        updatedAt
      );

      expect(customer.getId()).toBe(id);
      expect(customer.getUserId()).toBe(userId);
      expect(customer.getName()).toBe(name);
      expect(customer.getEmail()).toBe(email);
      expect(customer.getAddress()).toBe(address);
      expect(customer.getNumber()).toBe(number);
      expect(customer.getTaxId()).toBe(taxId);
      expect(customer.getActive()).toBe(active);
      expect(customer.getCreatedAt()).toBe(createdAt);
      expect(customer.getUpdatedAt()).toBe(updatedAt);
    });
  });

  describe('getters', () => {
    it('should return correct values', () => {
      const customer = Customer.create(
        userId,
        name,
        email,
        address,
        number,
        taxId
      );

      expect(customer.getId()).toBeDefined();
      expect(customer.getUserId()).toBe(userId);
      expect(customer.getName()).toBe(name);
      expect(customer.getEmail()).toBe(email);
      expect(customer.getAddress()).toBe(address);
      expect(customer.getNumber()).toBe(number);
      expect(customer.getTaxId()).toBe(taxId);
      expect(customer.getActive()).toBe(true);
      expect(customer.getCreatedAt()).toBeInstanceOf(Date);
      expect(customer.getUpdatedAt()).toBeInstanceOf(Date);
    });
  });

  describe('update methods', () => {
    let customer: Customer;

    beforeEach(() => {
      customer = Customer.create(
        userId,
        name,
        email,
        address,
        number,
        taxId
      );
    });

    it('should update name', () => {
      const newName = "Empresa Actualizada S.L.";
      const updatedCustomer = customer.updateName(newName);
      
      expect(updatedCustomer).not.toBe(customer); // Inmutabilidad
      expect(updatedCustomer.getName()).toBe(newName);
      expect(customer.getName()).toBe(name); // Original sin cambios
    });

    it('should update email', () => {
      const newEmail = Email.create("nuevo@empresa.com");
      const updatedCustomer = customer.updateEmail(newEmail);
      
      expect(updatedCustomer).not.toBe(customer);
      expect(updatedCustomer.getEmail()).toBe(newEmail);
      expect(customer.getEmail()).toBe(email);
    });

    it('should update address', () => {
      const newAddress = Address.create("Nueva Calle 456", "Barcelona", "08001", "España");
      const updatedCustomer = customer.updateAddress(newAddress);
      
      expect(updatedCustomer).not.toBe(customer);
      expect(updatedCustomer.getAddress()).toBe(newAddress);
      expect(customer.getAddress()).toBe(address);
    });

    it('should update taxId', () => {
      const newTaxId = TaxId.create("A87654321");
      const updatedCustomer = customer.updateTaxId(newTaxId);
      
      expect(updatedCustomer).not.toBe(customer);
      expect(updatedCustomer.getTaxId()).toBe(newTaxId);
      expect(customer.getTaxId()).toBe(taxId);
    });

    it('should update number', () => {
      const newNumber = "C-98765";
      const updatedCustomer = customer.updateNumber(newNumber);
      
      expect(updatedCustomer).not.toBe(customer);
      expect(updatedCustomer.getNumber()).toBe(newNumber);
      expect(customer.getNumber()).toBe(number);
    });
  });

  describe('activate/deactivate methods', () => {
    it('should activate an inactive customer', () => {
      const inactiveCustomer = Customer.reconstitute(
        CustomerId.create(),
        userId,
        name,
        email,
        number,
        address,
        taxId,
        false
      );
      
      const activatedCustomer = inactiveCustomer.activate();
      
      expect(activatedCustomer).not.toBe(inactiveCustomer);
      expect(activatedCustomer.getActive()).toBe(true);
      expect(inactiveCustomer.getActive()).toBe(false);
    });

    it('should not create new instance when activating already active customer', () => {
      const activeCustomer = Customer.create(
        userId,
        name,
        email,
        address,
        number,
        taxId
      );
      
      const result = activeCustomer.activate();
      
      expect(result).toBe(activeCustomer); // Misma instancia
    });

    it('should deactivate an active customer', () => {
      const activeCustomer = Customer.create(
        userId,
        name,
        email,
        address,
        number,
        taxId
      );
      
      const deactivatedCustomer = activeCustomer.deactivate();
      
      expect(deactivatedCustomer).not.toBe(activeCustomer);
      expect(deactivatedCustomer.getActive()).toBe(false);
      expect(activeCustomer.getActive()).toBe(true);
    });

    it('should not create new instance when deactivating already inactive customer', () => {
      const inactiveCustomer = Customer.reconstitute(
        CustomerId.create(),
        userId,
        name,
        email,
        number,
        address,
        taxId,
        false
      );
      
      const result = inactiveCustomer.deactivate();
      
      expect(result).toBe(inactiveCustomer); // Misma instancia
    });
  });
});
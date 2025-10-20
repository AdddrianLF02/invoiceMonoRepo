import { Customer } from '../Customer';
import { CustomerId } from '../../value-objects/CustomerId';
import { Email } from '../../value-objects/Email';
import { Address } from '../../value-objects/Address';
import { TaxId } from '../../value-objects/TaxId';
import { UserId } from '../../value-objects/UserId'; // <-- Importado

describe('Customer Entity', () => {
  // --- Arrange: Datos de prueba comunes ---
  const validUserId = UserId.create(); // Asume que crea un UUID válido
  const validEmail = Email.create('test@example.com');
  const validAddress = Address.create(
     '123 Main St',
     'Anytown',
     '12345',
     'USA',
  );
  const validTaxId = TaxId.create('B12345678');
  const validName = 'Test Customer';
  const validCustomerNumber = 'CUST-001'; // <-- Añadido número de cliente

  // --- Test 1: Creación Exitosa ---
  it('should create a Customer instance with valid data', () => {
    // Act
    const customer = Customer.create(
      validUserId,
      validName,
      validEmail,
      validAddress,
      validCustomerNumber, // <-- Añadido
      validTaxId,
    );

    // Assert
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.getId()).toBeInstanceOf(CustomerId); // ID se genera dentro
    expect(customer.getUserId()).toBe(validUserId); // <-- Verificado
    expect(customer.getName()).toBe(validName);
    expect(customer.getEmail()).toBe(validEmail);
    expect(customer.getAddress()).toBe(validAddress);
    expect(customer.getNumber()).toBe(validCustomerNumber); // <-- Verificado
    expect(customer.getTaxId()).toBe(validTaxId);
    expect(customer.getActive()).toBe(true); // <-- Verificado (default)
    expect(customer.getCreatedAt()).toBeInstanceOf(Date);
    expect(customer.getUpdatedAt()).toBeInstanceOf(Date);
    expect(customer.getUpdatedAt()).toEqual(customer.getUpdatedAt());
  });

   // --- Test 2: Validación de nombre vacío en creación ---
   it('should throw an error if name is empty during creation', () => {
    // Arrange
    const invalidName = '';

    // Act & Assert
    expect(() => {
      Customer.create(
        validUserId,
        invalidName, // <-- Nombre inválido
        validEmail,
        validAddress,
        validCustomerNumber,
        validTaxId,
      );
    }).toThrow('Customer name cannot be empty'); // Verifica el mensaje exacto
  });


  // --- Test 3: Métodos de Actualización (Inmutabilidad) ---
  it('should return a new instance with updated details when update methods are called', () => {
    // Arrange: Crear instancia inicial
    const initialCustomer = Customer.create(
      validUserId,
      validName,
      validEmail,
      validAddress,
      validCustomerNumber,
      validTaxId,
    );
    const initialUpdatedAt = initialCustomer.getUpdatedAt();

    // Nuevos datos
    const newName = 'Updated Customer Name';
    const newEmail = Email.create('updated@example.com');
    const newAddress = Address.create(
      '456 New Ave',
      'Newville',
      '67890',
      'Canada',
    );
    const newTaxId = TaxId.create('A87654321');
    const newCustomerNumber = 'CUST-002';

    // Act: Llamar a los métodos de actualización específicos
    // ¡Cada llamada devuelve una NUEVA instancia! Encadenamos las llamadas.
    const updatedCustomer = initialCustomer
        .updateName(newName)
        .updateEmail(newEmail)
        .updateAddress(newAddress)
        .updateTaxId(newTaxId)
        .updateNumber(newCustomerNumber);

    // Assert: Verificar la nueva instancia
    expect(updatedCustomer).toBeInstanceOf(Customer);
    expect(updatedCustomer).not.toBe(initialCustomer); // ¡Asegura que es una instancia diferente!
    expect(updatedCustomer.getId()).toBe(initialCustomer.getId()); // ID no debe cambiar
    expect(updatedCustomer.getUserId()).toBe(initialCustomer.getUserId()); // userId no debe cambiar (a menos que añadas un método para ello)
    expect(updatedCustomer.getName()).toBe(newName);
    expect(updatedCustomer.getEmail()).toBe(newEmail);
    expect(updatedCustomer.getAddress()).toBe(newAddress);
    expect(updatedCustomer.getTaxId()).toBe(newTaxId);
    expect(updatedCustomer.getNumber()).toBe(newCustomerNumber);
    expect(updatedCustomer.getActive()).toBe(initialCustomer.getActive()); // active no cambió
    expect(updatedCustomer.getCreatedAt()).toEqual(initialCustomer.getCreatedAt()); // createdAt no debe cambiar
    expect(updatedCustomer.getUpdatedAt().getTime()).toBeGreaterThan(initialUpdatedAt.getTime()); // updatedAt debe ser más reciente

    // Assert: Verificar que la instancia original NO cambió (Inmutabilidad)
    expect(initialCustomer.getName()).toBe(validName);
    expect(initialCustomer.getEmail()).toBe(validEmail);
    expect(initialCustomer.getAddress()).toBe(validAddress);
    expect(initialCustomer.getTaxId()).toBe(validTaxId);
    expect(initialCustomer.getNumber()).toBe(validCustomerNumber);
    expect(initialCustomer.getUpdatedAt()).toEqual(initialUpdatedAt);
  });

    // --- Test 4: Métodos activate/deactivate ---
  it('should correctly activate and deactivate a customer', () => {
     // Arrange
     const customer = Customer.create(
       validUserId,
       validName,
       validEmail,
       validAddress,
       validCustomerNumber,
       validTaxId
     );

     // Act: Desactivar
     const deactivatedCustomer = customer.deactivate();

     // Assert: Desactivado
     expect(deactivatedCustomer.getActive()).toBe(false);
     expect(deactivatedCustomer).not.toBe(customer); // Nueva instancia
     expect(deactivatedCustomer.getUpdatedAt().getTime()).toBeGreaterThan(customer.getUpdatedAt().getTime());

     // Act: Reactivar
     const reactivatedCustomer = deactivatedCustomer.activate();

     // Assert: Reactivado
     expect(reactivatedCustomer.getActive()).toBe(true);
     expect(reactivatedCustomer).not.toBe(deactivatedCustomer); // Nueva instancia
     expect(reactivatedCustomer.getUpdatedAt().getTime()).toBeGreaterThan(deactivatedCustomer.getUpdatedAt().getTime());
  });

  it('should return the same instance if already in the target state for activate/deactivate', () => {
    // Arrange: Crear cliente activo
    const activeCustomer = Customer.create(
      validUserId,
      validName,
      validEmail,
      validAddress,
      validCustomerNumber,
      validTaxId
    );

    // Act: Intentar activar de nuevo
    const stillActiveCustomer = activeCustomer.activate();

    // Assert: Misma instancia, no hay cambios
    expect(stillActiveCustomer).toBe(activeCustomer);
    expect(stillActiveCustomer.getUpdatedAt()).toEqual(activeCustomer.getUpdatedAt());

    // Arrange: Crear cliente desactivado
    const deactivatedCustomer = activeCustomer.deactivate();

    // Act: Intentar desactivar de nuevo
    const stillDeactivatedCustomer = deactivatedCustomer.deactivate();

    // Assert: Misma instancia, no hay cambios
    expect(stillDeactivatedCustomer).toBe(deactivatedCustomer);
    expect(stillDeactivatedCustomer.getUpdatedAt()).toEqual(deactivatedCustomer.getUpdatedAt());
  });

  it('should throw error via zod schema if updateName receives invalid data', () => {
      // Arrange
      const customer = Customer.create(
        validUserId,
        validName,
        validEmail,
        validAddress,
        validCustomerNumber,
        validTaxId
      );
      const invalidName = ''; // Nombre inválido según el schema

      // Act & Assert
      expect(() => {
          customer.updateName(invalidName);
      }).toThrow(); // Jest buscará cualquier error (podrías afinar con ZodError)
  });

});
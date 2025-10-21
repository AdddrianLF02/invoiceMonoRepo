import { CreateCustomerUseCase } from '../use-cases/customer/create-customer.use-case';
import { GetCustomerByIdUseCase } from '../use-cases/customer/get-customer-by-id.use-case';
import { UpdateCustomerUseCase } from '../use-cases/customer/update-customer.use-case';
import { GetCustomerByEmailUseCase } from '../use-cases/customer/get-customer-by-email.use-case';
import {
  type CustomerRepository,
  CUSTOMER_REPOSITORY,
  Customer,
  CustomerId,
  Email,
  Address,
  TaxId,
  UserId
} from '@repo/core';
import type { IUnitOfWork } from '@repo/core';

class InMemoryCustomerRepository implements CustomerRepository {
  private store = new Map<string, Customer>();

  async create(customer: Customer): Promise<Customer> {
    this.store.set(customer.getId().toString(), customer);
    return customer;
  }

  async findById(id: CustomerId): Promise<Customer | null> {
    return this.store.get(id.toString()) ?? null;
  }

  async findByEmail(email: Email): Promise<Customer | null> {
    return Array.from(this.store.values()).find(
      (c) => c.getEmail().getValue() === email.getValue()
    ) ?? null;
  }

  async update(customer: Customer): Promise<Customer> {
    this.store.set(customer.getId().toString(), customer);
    return customer;
  }
}

class InMemoryUnitOfWork implements IUnitOfWork {
  UOW_TOKEN = Symbol('UOW');
  constructor(public readonly customerRepository: CustomerRepository, public readonly invoiceRepository: any = null) {}
  async executeTransaction<T>(callback: () => Promise<T>): Promise<T> {
    return callback();
  }
}

// Presenters test doubles
class CaptureCustomerPresenter {
  public last: Customer | null = null;
  present(customer: Customer) {
    this.last = customer;
  }
}

describe('Customer Application Use Cases', () => {
  const userId = UserId.create();
  const name = "Empresa Test S.L.";
  const email = Email.create("test@empresa.com");
  const address = Address.create("Calle Test 123", "Madrid", "28001", "España");
  const number = "C-12345";
  const taxId = TaxId.create("B12345678");

  let repo: InMemoryCustomerRepository;
  let uow: InMemoryUnitOfWork;

  beforeEach(() => {
    repo = new InMemoryCustomerRepository();
    uow = new InMemoryUnitOfWork(repo);
  });

  it('CreateCustomerUseCase crea y presenta el cliente', async () => {
    const presenter = new CaptureCustomerPresenter();
    const useCase = new CreateCustomerUseCase(uow, presenter);

    await useCase.execute({
      userId: userId.getValue(),
      name,
      email: email.getValue(),
      address: {
        street: address.getStreet(),
        city: address.getCity(),
        postalCode: address.getPostalCode(),
        country: address.getCountry()
      },
      number,
      taxId: taxId.getValue()
    });

    // Verificar que se guardó en el repositorio
    const savedCustomer = await repo.findByEmail(email);
    expect(savedCustomer).not.toBeNull();
    
    // Verificar que se presentó correctamente
    expect(presenter.last).not.toBeNull();
    expect(presenter.last?.getName()).toBe(name);
    expect(presenter.last?.getEmail().getValue()).toBe(email.getValue());
  });

  it('GetCustomerByIdUseCase encuentra y presenta un cliente existente', async () => {
    // Crear un cliente primero
    const customer = Customer.create(
      userId,
      name,
      email,
      address,
      number,
      taxId
    );
    await repo.create(customer);

    const presenter = new CaptureCustomerPresenter();
    const useCase = new GetCustomerByIdUseCase(uow, presenter as any);

    await useCase.execute(customer.getId().toString());

    // Verificar que se presentó correctamente
    expect(presenter.last).not.toBeNull();
    expect(presenter.last?.getId().toString()).toBe(customer.getId().toString());
  });

  it('GetCustomerByEmailUseCase encuentra y presenta un cliente por email', async () => {
    // Crear un cliente primero
    const customer = Customer.create(
      userId,
      name,
      email,
      address,
      number,
      taxId
    );
    await repo.create(customer);

    const presenter = new CaptureCustomerPresenter();
    const useCase = new GetCustomerByEmailUseCase(uow, presenter as any);

    await useCase.execute(email.getValue());

    // Verificar que se presentó correctamente
    expect(presenter.last).not.toBeNull();
    expect(presenter.last?.getEmail().getValue()).toBe(email.getValue());
  });

  it('UpdateCustomerUseCase actualiza y presenta un cliente', async () => {
    // Crear un cliente primero
    const customer = Customer.create(
      userId,
      name,
      email,
      address,
      number,
      taxId
    );
    await repo.create(customer);

    const presenter = new CaptureCustomerPresenter();
    const useCase = new UpdateCustomerUseCase(uow, presenter as any);

    const newName = "Empresa Actualizada S.L.";
    const newEmail = "updated@empresa.com";

    await useCase.execute(customer.getId().toString(), {
      name: newName,
      email: newEmail,
      address: {
        street: "Nueva Calle 456",
        city: "Barcelona",
        postalCode: "08001",
        country: "España"
      },
      number: "C-98765",
      taxId: "A87654321"
    });

    // Verificar que se actualizó en el repositorio
    const updatedCustomer = await repo.findById(customer.getId());
    expect(updatedCustomer).not.toBeNull();
    expect(updatedCustomer?.getName()).toBe(newName);
    expect(updatedCustomer?.getEmail().getValue()).toBe(newEmail);
    
    // Verificar que se presentó correctamente
    expect(presenter.last).not.toBeNull();
    expect(presenter.last?.getName()).toBe(newName);
    expect(presenter.last?.getEmail().getValue()).toBe(newEmail);
  });
});
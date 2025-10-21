import { Injectable } from '@nestjs/common'; 
import { PrismaService } from '../database/prisma.service'; 
import {
  Customer,
  type CustomerRepository,
  CustomerId,
  UserId,
  Email,
  Address,
  TaxId
} from '@repo/core'

@Injectable() 
export class PrismaCustomerRepository implements CustomerRepository { 
  constructor(private prisma: PrismaService) {} 

  async create(customer: Customer): Promise<Customer> { 
    let addressStr = '';
    if (customer.getAddress()) {
      const addr = customer.getAddress();
      addressStr = [
        addr?.getStreet(),
        addr?.getCity(),
        addr?.getPostalCode(),
        addr?.getCountry()
      ].filter(Boolean).join(', ');
    }
    
    await this.prisma.customer.create({ 
      data: { 
        id: customer.getId().getValue(), 
        userId: customer.getUserId().getValue(), // <-- AÑADIDO
        name: customer.getName(), 
        email: customer.getEmail().getValue(),
        phone: customer.getNumber() || null,
        address: addressStr || null
      }, 
    }); 

    return customer; 
  } 

  async findById(id: CustomerId): Promise<Customer | null> { 
    const customer = await this.prisma.customer.findUnique({ 
      where: { id: id.getValue() }, 
    }); 

    if (!customer) return null; 

    const customerId = CustomerId.fromString(customer.id); 
    const userId = UserId.fromString(customer.userId); // <-- AÑADIDO
    const email = Email.create(customer.email); 
    
    let address: Address | undefined = undefined;
    if (customer.address) {
      const addressParts = customer.address.split(', ');
      address = Address.create(
        addressParts[0] || '',
        addressParts[1] || '',
        addressParts[2] || '',
        addressParts[3] || ''
      );
    }

    return Customer.reconstitute( 
      customerId, 
      userId, // <-- AÑADIDO
      customer.name, 
      email, 
      customer.phone || '', 
      address || Address.create('', '', '', ''),
      TaxId.create(''),
      true, 
      customer.createdAt,
      customer.updatedAt
    ); 
  } 

  async findByEmail(email: Email): Promise<Customer | null> { 
    const customer = await this.prisma.customer.findUnique({ 
      where: { email: email.getValue() }, 
    }); 

    if (!customer) return null; 

    const customerId = CustomerId.fromString(customer.id); 
    const userId = UserId.fromString(customer.userId); // <-- AÑADIDO
    const customerEmail = Email.create(customer.email); 
    
    let address: Address | undefined = undefined;
    if (customer.address) {
      const addressParts = customer.address.split(', ');
      address = Address.create(
        addressParts[0] || '',
        addressParts[1] || '',
        addressParts[2] || '',
        addressParts[3] || ''
      );
    }

    return Customer.reconstitute( 
      customerId, 
      userId, // <-- AÑADIDO
      customer.name, 
      customerEmail, 
      customer.phone || '', 
      address || Address.create('', '', '', ''),
      TaxId.create(''),
      true, 
      customer.createdAt,
      customer.updatedAt
    ); 
  } 

  async update(customer: Customer): Promise<Customer> { 
    let addressStr = '';
    if (customer.getAddress()) {
      const addr = customer.getAddress();
      addressStr = [
        addr?.getStreet(),
        addr?.getCity(),
        addr?.getPostalCode(),
        addr?.getCountry()
      ].filter(Boolean).join(', ');
    }
    
    await this.prisma.customer.update({ 
      where: { id: customer.getId().getValue() }, 
      data: { 
        name: customer.getName(), 
        email: customer.getEmail().getValue(), 
        phone: customer.getNumber() || null,
        address: addressStr || null,
        userId: customer.getUserId().getValue(), // <-- AÑADIDO
      }, 
    }); 

    return customer; 
  }

  async findByUserId(userId: UserId): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      where: { userId: userId.getValue() },
    });

    return Promise.all(customers.map(async (customer) => {
      const customerId = CustomerId.fromString(customer.id);
      const userIdObj = UserId.fromString(customer.userId);
      const email = Email.create(customer.email);
      
      let address: Address | undefined = undefined;
      if (customer.address) {
        const addressParts = customer.address.split(', ');
        address = Address.create(
          addressParts[0] || '',
          addressParts[1] || '',
          addressParts[2] || '',
          addressParts[3] || ''
        );
      }

      return Customer.reconstitute(
        customerId,
        userIdObj,
        customer.name,
        email,
        customer.phone || '',
        address || Address.create('', '', '', ''),
        TaxId.create(''),
        true,
        customer.createdAt,
        customer.updatedAt
      );
    }));
  }

  async delete(id: CustomerId): Promise<void> {
    await this.prisma.customer.delete({
      where: { id: id.getValue() },
    });
  }

  async exists(id: CustomerId): Promise<boolean> {
    const count = await this.prisma.customer.count({
      where: { id: id.getValue() },
    });
    return count > 0;
  }
}
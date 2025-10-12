import { Module } from '@nestjs/common';
import { PrismaCustomerRepository, PrismaInvoiceRepository, PrismaModule, PrismaUserRepository } from '@repo/infrastructure';
import { USER_REPOSITORY, CUSTOMER_REPOSITORY, INVOICE_REPOSITORY, UserRepository } from '@repo/core';

const userRepositoryProvider = { provide: USER_REPOSITORY, useClass: PrismaUserRepository };
const customerRepositoryProvider = { provide: CUSTOMER_REPOSITORY, useClass: PrismaCustomerRepository };
const invoiceRepositoryProvider = { provide: INVOICE_REPOSITORY, useClass: PrismaInvoiceRepository };

@Module({
  imports: [PrismaModule],
  providers: [
    userRepositoryProvider,
    customerRepositoryProvider,
    invoiceRepositoryProvider,
  ],
  exports: [
    userRepositoryProvider,
    customerRepositoryProvider,
    invoiceRepositoryProvider,
  ],
})
export class InfrastructureModule {}
import { Module } from '@nestjs/common';
import { 
  PrismaCustomerRepository, 
  PrismaInvoiceRepository, 
  PrismaModule, 
  PrismaUserRepository,
  VatTaxCalculationStrategy,
  PrismaUnitOfWork 
} from '@repo/infrastructure';
import { 
  USER_REPOSITORY, 
  CUSTOMER_REPOSITORY, 
  INVOICE_REPOSITORY, 
  UNIT_OF_WORK, 
  TAX_CALCULATION_STRATEGY 
} from '@repo/core';

const userRepositoryProvider = { provide: USER_REPOSITORY, useClass: PrismaUserRepository };
const customerRepositoryProvider = { provide: CUSTOMER_REPOSITORY, useClass: PrismaCustomerRepository };
const invoiceRepositoryProvider = { provide: INVOICE_REPOSITORY, useClass: PrismaInvoiceRepository };

const unitOfWorkProvider = { provide: UNIT_OF_WORK, useClass: PrismaUnitOfWork };
const taxCalculationStrategyProvider = { provide: TAX_CALCULATION_STRATEGY, useClass: VatTaxCalculationStrategy  };

@Module({
  imports: [PrismaModule],
  providers: [
    userRepositoryProvider,
    customerRepositoryProvider,
    invoiceRepositoryProvider,
    unitOfWorkProvider,
    taxCalculationStrategyProvider,
  ],
  exports: [
    userRepositoryProvider,
    customerRepositoryProvider,
    invoiceRepositoryProvider,
    unitOfWorkProvider,
    taxCalculationStrategyProvider,
  ],
})
export class InfrastructureModule {}

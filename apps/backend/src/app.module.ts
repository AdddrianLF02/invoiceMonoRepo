import { Module } from '@nestjs/common';
import { PrismaModule } from '@repo/infrastructure'
import { InvoicesModule } from './invoices/invoices.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: 
  [
    InvoicesModule, 
    PrismaModule, 
    CustomersModule,  
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

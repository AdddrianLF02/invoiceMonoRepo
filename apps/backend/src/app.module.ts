import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: 
  [
    ConfigModule.forRoot({ isGlobal: true }),
    InvoicesModule,  
    CustomersModule,  
    AuthModule,
    DashboardModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

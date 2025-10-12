import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: 
  [
    ConfigModule.forRoot({ isGlobal: true }),
    InvoicesModule,  
    CustomersModule,  
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

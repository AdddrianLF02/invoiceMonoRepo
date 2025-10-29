import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { DashboardModule } from './dashboard/dashboard.module';
import { BullModule } from '@nestjs/bullmq';
import { PdfGenerationModule } from './pdf-generation/pdf-generation.module';

@Module({
  imports: 
  [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379
      }
    }),
    InvoicesModule,  
    CustomersModule,  
    AuthModule,
    DashboardModule,
    PdfGenerationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

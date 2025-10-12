import { Module } from '@nestjs/common';
import { ApplicattionModule } from 'src/modules/application.module';
import { CustomerController } from './customer.controller';

@Module({
    imports: [ApplicattionModule],
    controllers: [CustomerController],
    providers: []
})

export class CustomersModule {}

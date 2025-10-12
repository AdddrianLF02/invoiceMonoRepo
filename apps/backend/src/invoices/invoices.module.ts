import { Module } from '@nestjs/common';
import { ApplicattionModule } from 'src/modules/application.module';
import { InvoiceController } from './invoice.controller';

@Module({
    imports: [ApplicattionModule],
    controllers: [InvoiceController],
    providers: []
})

export class InvoicesModule {}

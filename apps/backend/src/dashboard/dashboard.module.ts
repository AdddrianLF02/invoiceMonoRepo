import { CustomersModule } from "src/customers/customers.module";
import { InvoicesModule } from "src/invoices/invoices.module";
import { InfrastructureModule } from "src/modules/infrastructure.module";
import { DashboardController } from "./dashboard.controller";
import { Module } from "@nestjs/common";

@Module({
    imports: [InvoicesModule, CustomersModule, InfrastructureModule],
    controllers: [DashboardController],
    providers: []
})
export class DashboardModule {}
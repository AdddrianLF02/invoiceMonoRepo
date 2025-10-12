import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure.module";
import { HashingService } from "src/auth/hashing.service";
import { CreateCustomerUseCase, CreateInvoiceUseCase, CreateUserUseCase, DeleteInvoiceUseCase, GetCustomerByEmailUseCase, GetCustomerByIdUseCase, GetCustomerInvoicesUseCase, GetInvoiceUseCase, UpdateCustomerUseCase, UpdateInvoiceUseCase, ValidateUserUseCase } from "@repo/application";

const useCases = [
    // CUSTOMER
    CreateCustomerUseCase,
    GetCustomerByEmailUseCase,
    GetCustomerByIdUseCase,
    UpdateCustomerUseCase,
    // INVOICE
    CreateInvoiceUseCase,
    DeleteInvoiceUseCase,
    GetCustomerInvoicesUseCase,
    GetInvoiceUseCase,
    UpdateInvoiceUseCase,
    // USER
    CreateUserUseCase,
    ValidateUserUseCase,

]

@Module({
    imports: [InfrastructureModule],
    providers: [...useCases, HashingService],
    exports: [...useCases, HashingService]
})

export class ApplicattionModule {}
import { Module, Scope } from '@nestjs/common';
import { ApplicattionModule } from 'src/modules/application.module';
import { InvoiceController } from './invoice.controller';
import { InfrastructureModule } from 'src/modules/infrastructure.module';
import { CreateInvoicePresenter } from './presenters/create-invoice.presenter';
import { CREATE_INVOICE_INPUT_TOKEN, CREATE_INVOICE_OUTPUT_TOKEN, CreateInvoiceUseCase, INPUT_TOKEN, OUTPUT_TOKEN } from '@repo/application';

@Module({
    // Necesitamos el ApplicationModule para Use Cases y el InfrastructureModule para UoW/Repos
    imports: [ApplicattionModule, InfrastructureModule],
    controllers: [InvoiceController],
    providers: [
        // Custom Provider para el objeto Response (scope por request)
        {
          provide: 'EXPRESS_RESPONSE',
          scope: Scope.REQUEST,
          useFactory: (context: any) => {
            // context es un ExecutionContext en tiempo de ejecución
            // Nest lo resuelve internamente con `HttpArgumentsHost`
            const http = context.switchToHttp();
            return http.getResponse()
          } ,
          inject: [/** nest inyectará el contexto automáticamente */] 
        },
        // Presenter
        {
            provide: CreateInvoicePresenter,
            useClass: CreateInvoicePresenter,
            scope: Scope.REQUEST
        },
        {
            provide: CREATE_INVOICE_OUTPUT_TOKEN,
            useExisting: CreateInvoicePresenter,
            scope: Scope.REQUEST
        },

        // Use Case
        {
            provide: CREATE_INVOICE_INPUT_TOKEN,
            useClass: CreateInvoiceUseCase
        },

        // (Opcional, si no vienen desde InfrastructureModule)
    // { provide: UNIT_OF_WORK, useClass: PrismaUnitOfWork, scope: Scope.REQUEST },
    // { provide: TAX_CALCULATION_STRATEGY, useClass: DefaultTaxCalculationStrategy },
    ]
})

export class InvoicesModule {}

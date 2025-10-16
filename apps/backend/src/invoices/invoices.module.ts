import { Module, Scope } from '@nestjs/common';
import { ApplicattionModule } from 'src/modules/application.module';
import { InvoiceController } from './invoice.controller';
import { InfrastructureModule } from 'src/modules/infrastructure.module';
import { CreateInvoicePresenter } from './presenters/create-invoice.presenter';
import { CreateInvoiceUseCase, INPUT_TOKEN, OUTPUT_TOKEN } from '@repo/application';

@Module({
    // Necesitamos el ApplicationModule para Use Cases y el InfrastructureModule para UoW/Repos
    imports: [ApplicattionModule, InfrastructureModule],
    controllers: [InvoiceController],
    providers: [
        // El presenter (Request Scoped) - Debe estar listado primero
        {
            provide: CreateInvoicePresenter,
            useClass: CreateInvoicePresenter,
            scope: Scope.REQUEST
        },

        // El enlace OutPutPort -> Presenter (Adapter)
        {
            provide: OUTPUT_TOKEN,
            // Usamos la instancia REQUEST SCOPED del Presenter
            useExisting: CreateInvoicePresenter,
            scope: Scope.REQUEST
        },
        // 3. ENLACE: Input Port (Core Interface) -> Use Case (Interactor)
        {
            // El Controller pide el Input Port (su token)
            provide: INPUT_TOKEN, 
            useClass: CreateInvoiceUseCase, // Implementación
        },
        
        // [FALTA CRÍTICA]: Se debe definir el binding para UNIT_OF_WORK y TAX_CALCULATION_STRATEGY 
        // si no están definidos en ApplicationModule o InfrastructureModule.
        // Si InfrastructureModule ya expone IUnitOfWork, esto está bien.
        
        // Si no:
        // { provide: UNIT_OF_WORK, useClass: PrismaUnitOfWork, scope: Scope.REQUEST }, 
        // { provide: TAX_CALCULATION_STRATEGY, useClass: DefaultTaxStrategy },
    ]
})

export class InvoicesModule {}

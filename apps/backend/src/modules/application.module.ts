import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure.module";


@Module({
    imports: [InfrastructureModule],
    providers: [ ],
    exports: [
        InfrastructureModule
    ]
})

export class ApplicationModule {}
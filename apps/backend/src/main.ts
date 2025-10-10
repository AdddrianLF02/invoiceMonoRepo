import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DomainExceptionFilter } from './api/filters/domain-exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno desde .env
  const app = await NestFactory.create(AppModule);
  
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Invoice API')
    .setDescription('API para gestión de facturas')
    .setVersion('1.0')
    .build();


   app.useGlobalFilters(new DomainExceptionFilter());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

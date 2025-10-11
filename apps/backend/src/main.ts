import 'reflect-metadata'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DomainExceptionFilter } from './api/filters/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitamos CORS para que el frontend pueda comunicarse
  app.enableCors({
    origin: 'http://localhost:3001', // O la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Invoice API')
    .setDescription('API para gestión de facturas')
    .setVersion('1.0')
    .addBearerAuth() // Añadimos la opción para poner el token JWT en Swagger
    .build();

  app.useGlobalFilters(new DomainExceptionFilter());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

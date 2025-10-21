import 'reflect-metadata'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DomainExceptionFilter } from './filters/domain-exception.filter';
import helmet from 'helmet'
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración de Seguridad HTTP (Helmet y CORS estricto)
  app.use(helmet());
  app.enableCors({
    origin: 'http://localhost:3001', // O la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validación Global (ZodValidationPipe)
  // Asumiendo que tenemos integrado un Zod Pipe customizado
  app.useGlobalPipes(new ZodValidationPipe());

  // Guards de Seguridad Global ( Rate limiting y Autenticación por defecto )
  // Usando el módulo Throttler de NestJS
  // app.useGlobalGuards(new ThrottlerGuard());
  // Se recomienda aplicar el AuthGuard a nivel de módulo o controlador
  // a menos que TODAS las rutas requieran autenticación.

  // 4. Filtro de Excepciones de Dominio (Domain Exception Filter)
  // El filtro existente en src/api/filters/domain-exception.filter.ts
  // debe aplicarse globalmente para mapear excepciones del Core a códigos HTTP.
  app.useGlobalFilters(new DomainExceptionFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Invoice API')
    .setDescription('API para gestión de facturas')
    .setVersion('1.0')
    .addBearerAuth() // Añadimos la opción para poner el token JWT en Swagger
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

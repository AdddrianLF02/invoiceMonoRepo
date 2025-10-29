import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq'; // Importa BullModule para manejar colas
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { PdfGenerationProcessor } from './pdf-generation.processor';
import { AuthModule } from 'src/auth/auth.module';
import { PDF_GENERATION_QUEUE } from './pdf-generation.token';
// Importaremos el Processor más adelante cuando lo creemos
// import { PdfGenerationProcessor } from './pdf-generation.processor';


@Module({
  imports: [
    AuthModule,
    ConfigModule,
    // Registra la cola 'pdf-generation'
    BullModule.registerQueueAsync({
      name: PDF_GENERATION_QUEUE,
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      useFactory: async (configService: ConfigService) => ({
        // Configuración de la conexión a Redis usando variables de entorno
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'), // Valor por defecto 'localhost'
          port: configService.get<number>('REDIS_PORT', 6379),       // Valor por defecto 6379
          password: configService.get<string>('REDIS_PASSWORD'),     // Lee la contraseña
          // db: configService.get<number>('REDIS_DB', 0),           // Opcional: Base de datos
        },
        // Opciones adicionales de la cola (opcional)
        defaultJobOptions: {
          attempts: 3, // Intentar hasta 3 veces si falla
          backoff: {
            type: 'exponential',
            delay: 1000, // Reintentar después de 1s, luego 2s, 4s...
          },
          removeOnComplete: true, // Limpiar trabajos completados
          removeOnFail: { age: 24 * 3600 }, // Mantener trabajos fallidos por 24h
        },
      }),
      inject: [ConfigService], // Inyecta ConfigService en useFactory
    }),
  ],
  // Añadiremos el Processor aquí cuando lo creemos
  providers: [PdfGenerationProcessor],
  // Exporta BullModule para que otros módulos puedan inyectar la cola
  exports: [BullModule],
})
export class PdfGenerationModule {}
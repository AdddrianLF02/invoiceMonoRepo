import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Este método se llama automáticamente cuando el módulo se inicializa.
    // Nos conectamos a la base de datos.
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Esto asegura que la aplicación se cierra de forma limpia
    // y no deja conexiones a la base de datos abiertas.
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
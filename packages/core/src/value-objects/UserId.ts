
import { z } from 'zod';
import cuid from 'cuid';

// Schema de Zod para la validación
const UserIdSchema = z.cuid('El ID de usuario debe ser un CUID válido');

export class UserId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(): UserId {
    return new UserId(cuid());
  }

  public static fromString(value: string): UserId {
    UserIdSchema.parse(value); // Valida que el string sea un CUID
    return new UserId(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
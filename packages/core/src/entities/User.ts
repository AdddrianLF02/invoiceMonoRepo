import { z } from 'zod';
import { UserId } from '../value-objects/UserId';
import { Email, EmailSchema } from '../value-objects/Email'; // Asumimos que EmailSchema está en el VO de Email

// --- Schema de Zod para la Entidad ---
export const UserEntitySchema = z.object({
  id: z.cuid('El ID de usuario debe ser un CUID válido'),
  name: z.string().optional().nullable(),
  email: EmailSchema, // Usamos el schema del Value Object
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Tipo para los datos planos que vienen de la base de datos
export type UserData = z.infer<typeof UserEntitySchema>;

// --- La Clase de Dominio 'User' ---
export class User {
  private readonly id: UserId;
  private readonly name: string | null;
  private readonly email: Email;
  private readonly password: string; // La contraseña es privada y readonly
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  private constructor(props: UserData) {
    this.id = UserId.fromString(props.id);
    this.name = props.name ?? null;
    this.email = Email.create(props.email);
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  // Factory para crear un nuevo usuario
  public static create(props: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): User {
    const validatedProps = UserEntitySchema.omit({ 
        id: true, 
        createdAt: true, 
        updatedAt: true 
    }).parse(props);
    
    return new User({
      id: UserId.create().getValue(), // Genera un CUID nuevo
      ...validatedProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public toSafeObject() {
    // Este método devuelve un objeto JavaScript plano
    // con todos los datos EXCEPTO la contraseña.
    return {
      id: this.id.getValue(),
      name: this.name,
      email: this.email.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Factory para reconstruir un usuario desde la base de datos
  public static reconstitute(props: UserData): User {
    // Bypass revalidación del `id`, ya que el `id` ya está validado al crearse el usuario
    const validatedProps = UserEntitySchema.omit({ id: true }).parse(props);
    return new User({
      ...validatedProps,
      id: UserId.create().getValue(), // Usamos directamente `fromString` sin volver a validar
    });
  }

  // --- MÉTODOS DE COMPORTAMIENTO ---

  // Método para comparar contraseñas (necesitará bcrypt)
  public async comparePassword(plainText: string): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plainText, this.password);
  }

  // --- GETTERS COMPLETOS ---

  public getId(): UserId { return this.id; }
  public getName(): string | null { return this.name; }
  public getEmail(): Email { return this.email; }
  public getPasswordHash(): string { return this.password; }
  public getCreatedAt(): Date { return this.createdAt; }
  public getUpdatedAt(): Date { return this.updatedAt; }
}

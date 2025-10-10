import { z } from 'zod';

// Asumimos que CustomerId es un UUID
export const CustomerIdSchema = z.string().uuid('El ID del cliente debe ser un UUID válido');

export const EmailSchema = z.string().email('El formato del email es inválido');

// Puedes hacer validaciones más complejas si es necesario, ej. con .regex()
export const TaxIdSchema = z.string().min(1, 'El NIF/CIF es obligatorio');

export const AddressSchema = z.object({
  street: z.string().min(1, 'La calle es obligatoria'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  zipCode: z.string().min(1, 'El código postal es obligatorio'),
  country: z.string().min(1, 'El país es obligatorio'),
});
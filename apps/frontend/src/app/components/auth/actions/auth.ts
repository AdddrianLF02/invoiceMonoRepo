import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// Define el schema de validación con Zod, igual que en el backend
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // El nombre que se mostrará en el formulario de inicio de sesión (opcional)
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Valida las credenciales usando el schema de Zod
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Aquí llamas a tu backend de NestJS para validar al usuario
          // La URL debe ser la de tu backend, que está corriendo en otro puerto
          const res = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            // Si la respuesta no es 2xx, devuelve null para indicar fallo de autenticación
            console.error('Failed to login:', await res.text());
            return null;
          }

          const user = await res.json();
          
          // Si el backend devuelve un usuario, la autenticación es exitosa
          if (user) {
            return user; // El objeto `user` se guardará en el token JWT de la sesión
          }
        }
        
        // Devuelve null si las credenciales no son válidas
        return null;
      },
    }),
  ],
  // Opcional: define páginas personalizadas si las necesitas
  pages: {
    signIn: '/login',
  },
});

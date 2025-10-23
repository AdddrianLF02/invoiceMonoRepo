import 'next-auth';
import 'next-auth/jwt';

// 1. Aumentamos el tipo del objeto User que devuelve 'authorize'
declare module 'next-auth' {
  interface User {
    // Estas son las propiedades que DEVUELVE tu backend de NestJS
    id: string;
    email: string;
    accessToken: string; // <-- Asegúrate que sea 'accessToken' (camelCase)
  }

  // 2. Aumentamos el objeto Session para que tenga el token
  interface Session {
    accessToken: string; // <-- Propiedad en la RAÍZ de la sesión
    user: {
      id: string;
      // ... otras propiedades que quieras exponer
    } & DefaultSession['user'];
  }
}

// 3. Aumentamos el tipo del JWT (el token que se guarda en la cookie)
declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    accessToken: string;
  }
}
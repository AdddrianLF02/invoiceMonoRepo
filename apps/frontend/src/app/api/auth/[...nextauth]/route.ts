import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// Para asegurar que los tipos de la sesión son correctos
// Importamos JWT de next-auth/jwt con un alias para evitar conflictos
import { JWT } from "next-auth/jwt";
import { LoginSchema } from "@repo/application";

// Reutilizamos el schema de validación que ya tenemos en nuestro paquete core


// **Definiciones de Tipos Personalizadas (Correctas)**
// Nota: NextAuth ya tiene su propia definición de User y JWT. 
// Las mantenemos aquí para que la lógica interna sea legible,
// pero usamos type assertion en los callbacks.
interface CustomUser extends User {
    id: string;
    email: string;
    access_token: string;
}

interface CustomJWT extends JWT {
    id: string;
    email: string;
    access_token: string; // Coherente con el backend (snake_case)
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                pass: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // 1. LLama a tu backend de NestJS para loguear al usuario
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        pass: credentials?.pass
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if(!res.ok) return null;

                // 2. NESTJS te devuelve el usuario y el token de acceso (JWT)
                const data = await res.json();

                return data;
            },
        }),
    ],
    session : {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        signOut: '/register'
    },
    callbacks: {
        // SOLUCIÓN: Usamos la firma de función genérica esperada por NextAuth.
        // `user` será de tipo `CustomUser` SOLO en el primer sign-in, así que lo forzamos.
        // `token` es de tipo `JWT` (de next-auth/jwt) y lo forzamos a `CustomJWT`.
        async jwt({ token, user,  }) {
            
            // 'user' lo que retornamos de authorize
            if(user) {
                token.accessToken = user.accessToken // Almacenamos el JWT de NestJS aquí
                token.userId = user.id // Almacenamos el ID
            }
            return token
        },
        
        // SOLUCIÓN: Mismo problema de tipado, usamos la firma genérica y type assertion.
        async session({ session, token }) {
            
            // Forzamos el tipo del token para leer las propiedades añadidas
            const sessionToken = token as CustomJWT;

            // Hacemos que los datos (ID y Token del backend) estén disponibles en el objeto de sesión
            if (sessionToken && session.user) {
                session.user.id = sessionToken.id;
                session.user.email = sessionToken.email;
                // Usamos 'access_token' para ser coherentes con la definición de CustomJWT y el backend
                session.accessToken = sessionToken.access_token; 
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
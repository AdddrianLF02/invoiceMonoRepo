import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod";

// Para asegurar que los tipos de la sesión son correctos
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

// Reutilizamos el schema de validación que ya tenemos en nuestro paquete core
import { LoginSchema } from "@repo/core";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // 1. Validamos la entrada con nuestro schema compartido
                const parsedCredentials = LoginSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    
                    // 2. Llamamos a nuestra API de backend para que haga el trabajo duro
                    const res = await fetch('http://localhost:3000/auth/login', { // Asegúrate de que el puerto del backend es correcto
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    // 3. Si la API del backend devuelve un error (401, etc.), fallamos la autenticación
                    if (!res.ok) {
                        console.error("La autenticación en el backend ha fallado.");
                        return null;
                    }

                    // 4. Si la API devuelve un usuario, lo pasamos a NextAuth para que cree la sesión
                    const user = await res.json();
                    if (user) {
                        return user;
                    }
                }
                
                // Si la validación de Zod falla o el backend no devuelve usuario, fallamos.
                return null;
            },
        }),
    ],
    session : {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login', // Corregido: La página de login debería ser /login
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            // Cuando el usuario inicia sesión, el objeto 'user' viene del `authorize`
            if (user) {
                token.id = user.id;
                // Puedes añadir más datos del usuario al token si lo necesitas
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            // Hacemos que los datos del token estén disponibles en el objeto de sesión
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


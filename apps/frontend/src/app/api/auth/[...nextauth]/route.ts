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
                const parsedCredentials = LoginSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, pass } = parsedCredentials.data;
                    
                    // 2. Llamamos a nuestra API de backend para que haga el trabajo duro
                    const res = await fetch('http://localhost:4000/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, pass }),
                    });

                    if (!res.ok) {
                        console.error("La autenticación en el backend ha fallado.");
                        return null;
                    }

                    // 4. Si la API devuelve un usuario, lo pasamos a NextAuth para que cree la sesión
                    // Recibimos: { access_token: string, user: { id: string, email: string } }
                    const data = await res.json()
                    
                    if(data && data.user && data.access_token) {
                        // Mapeamos la respuesta al tipo NextAuth User extendido
                        const nextAuthUser: CustomUser = {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.email,
                            access_token: data.access_token,
                        }
                        return nextAuthUser;
                    }
                }
                
                return null;
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
        async jwt({ token, user, trigger, account, profile, isNewUser }) {
            
            // 1. Forzamos el tipo del token para acceder a nuestras propiedades personalizadas
            const customToken = token as CustomJWT;

            // 2. Si el usuario existe (inicio de sesión), añadimos el ID y el Token del backend
            if (user && trigger === 'signIn') {
                const customUser = user as CustomUser; // Forzamos el tipo del usuario al iniciar sesión
                
                customToken.id = customUser.id;
                customToken.email = customUser.email;
                customToken.access_token = customUser.access_token; // Almacenamos el JWT del backend (el que usaremos en las peticiones)
            }
            
            // Justificación: NextAuth gestiona la rotación y el cifrado del token (session token).
            // Nosotros inyectamos nuestro access_token del backend en ese token.
            return token;
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
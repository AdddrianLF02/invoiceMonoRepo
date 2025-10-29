import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// Para asegurar que los tipos de la sesión son correctos
// Importamos JWT de next-auth/jwt con un alias para evitar conflictos
import { JWT } from "next-auth/jwt";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: credentials?.email,
            pass: credentials?.pass
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
         console.error("Backend request failed with status:", res.status, res.statusText);
         // Intenta leer el cuerpo del error como texto si existe
         try {
            const errorBody = await res.text();
            console.error("Backend error body:", errorBody);
         } catch (e) {
            console.error("Could not read error body as text.");
         }
         return null; // Retorna null si la respuesta no es OK
    }

    // Si la respuesta es OK (2xx), intenta leer y parsear el cuerpo
    try {
        // Primero, intenta leer el cuerpo como texto para ver qué devuelve realmente
        const responseBodyText = await res.text();
        console.log("Raw backend response body (text):", responseBodyText);

        // Ahora, intenta parsear ese texto como JSON
        const data = JSON.parse(responseBodyText);
        console.log("Data from backend (parsed JSON):", data); // <--- Ahora debería llegar aquí si el JSON es válido

        // ... (el resto de tu lógica if/else para data) ...
         if (data && data.access_token && data.user && data.user.id && data.user.email) {
             return {
                 id: data.user.id,
                 email: data.user.email,
                 access_token: data.access_token, // Usar snake_case como viene del backend
                 name: data.user.name
             };
         } else {
             console.error("Parsed backend response missing expected fields.");
             console.log("Detailed checks:");
             console.log("Check data:", !!data);
             console.log("Check data.access_token:", !!data?.access_token);
             console.log("Check data.user:", !!data?.user);
             console.log("Check data.user.id:", !!data?.user?.id);
             console.log("Check data.user.email:", !!data?.user?.email);
             return null;
         }

    } catch (error) {
        console.error('Error parsing backend response JSON:', error);
        // Considera loguear responseBodyText aquí también si ya lo leíste
        return null; // Retorna null si el parseo falla
    }
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
            // 'user' es lo que retornamos de authorize en el primer login
            if (user) {
                token.accessToken = (user as any).access_token; // JWT del backend
                token.userId = user.id; // ID del usuario
                token.email = user.email; // Email para asegurar disponibilidad en la sesión
            }
            return token;
        },
        
        // SOLUCIÓN: Mismo problema de tipado, usamos la firma genérica y type assertion.
        async session({ session, token }) {
            // Propagamos el token del backend
            (session as any).accessToken = (token as any).accessToken;

            if (session.user) {
                (session.user as any).id = (token as any).userId;
                session.user.email = (token as any).email || session.user.email;
                (session as any).accessToken = (token as any).accessToken;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
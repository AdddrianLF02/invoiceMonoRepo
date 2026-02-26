import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                pass: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000/api/v1';
                // Backend expects /auth/login, not /api/v1/auth/login, let's target port 3000
                const baseUrl = apiUrl.includes('4000') ? 'http://localhost:4000' : apiUrl.replace('/api/v1', '');

                try {
                    const res = await fetch(`${baseUrl}/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials?.email,
                            pass: credentials?.pass
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const errorText = await res.text();
                        console.error("Backend login failed:", res.status, errorText);
                        return null;
                    }

                    const data = await res.json();

                    // NestJS clean architecture auth use case returns user and access_token
                    if (data && data.access_token && data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            access_token: data.access_token
                        };
                    }

                    console.error("Invalid login response format:", data);
                    return null;
                } catch (error) {
                    console.error("Login fetch error:", error);
                    return null;
                }
            }
        }),
    ],
    session: {
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
        async jwt({ token, user, }) {
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
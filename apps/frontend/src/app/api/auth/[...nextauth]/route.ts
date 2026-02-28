import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// ──────────────────────────────────────────────────────────────
// ¿Por qué auto-refresh aquí?
//   → NextAuth maneja la sesión del frontend. Si el access_token
//     del backend expira (15min), necesitamos renovarlo transparentemente
//     usando el refresh_token (7d) sin molestar al usuario.
//
// ¿Cómo funciona el flujo?
//   1. Login → guardamos access_token + refresh_token + expiresAt
//   2. Cada vez que se lee la sesión, jwt() se ejecuta
//   3. Si expiresAt < ahora → llamamos a POST /auth/refresh
//   4. Si el refresh falla → marcamos error para redirigir a /login
// ──────────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
const BASE_URL = API_BASE_URL.includes('/api/v1')
    ? API_BASE_URL.replace('/api/v1', '')
    : API_BASE_URL;

/**
 * Llama al backend para obtener un nuevo access_token
 * usando el refresh_token que guardamos en la sesión.
 */
async function refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresAt: number;
} | null> {
    try {
        const res = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!res.ok) {
            console.error('[NextAuth] Refresh failed:', res.status);
            return null;
        }

        const data = await res.json();

        return {
            accessToken: data.access_token,
            // access_token dura 15min → expiresAt = ahora + 14min (margen de 1min)
            expiresAt: Date.now() + 14 * 60 * 1000,
        };
    } catch (error) {
        console.error('[NextAuth] Refresh error:', error);
        return null;
    }
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
                try {
                    const res = await fetch(`${BASE_URL}/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials?.email,
                            pass: credentials?.pass,
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (!res.ok) {
                        console.error('[NextAuth] Login failed:', res.status);
                        return null;
                    }

                    const data = await res.json();

                    if (data?.access_token && data?.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            access_token: data.access_token,
                            refresh_token: data.refresh_token,  // ← NUEVO: guardamos el refresh
                        };
                    }

                    return null;
                } catch (error) {
                    console.error('[NextAuth] Login error:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        signOut: '/register',
    },
    callbacks: {
        // ──────────────────────────────────────────────────────────
        // jwt() se ejecuta en CADA request que necesita la sesión.
        // Es el lugar perfecto para verificar y renovar el access_token.
        // ──────────────────────────────────────────────────────────
        async jwt({ token, user }) {
            // Primer login: user viene del authorize()
            if (user) {
                token.accessToken = (user as any).access_token;
                token.refreshToken = (user as any).refresh_token;
                token.userId = user.id;
                token.email = user.email;
                // access_token dura 15min → guardamos expiresAt con 1min de margen
                token.expiresAt = Date.now() + 14 * 60 * 1000;
                return token;
            }

            // Si el token aún no ha expirado → lo devolvemos tal cual
            if (Date.now() < (token.expiresAt as number)) {
                return token;
            }

            // Token expirado → intentamos refresh
            console.log('[NextAuth] Access token expired, refreshing...');
            const refreshed = await refreshAccessToken(token.refreshToken as string);

            if (refreshed) {
                token.accessToken = refreshed.accessToken;
                token.expiresAt = refreshed.expiresAt;
                console.log('[NextAuth] Token refreshed successfully');
                return token;
            }

            // Refresh falló → marcamos error para que el frontend lo detecte
            console.warn('[NextAuth] Refresh failed, session will expire');
            return { ...token, error: 'RefreshTokenExpired' };
        },

        // ──────────────────────────────────────────────────────────
        // session() propaga los datos del JWT al objeto session
        // que usan los Server Components y el cliente.
        // ──────────────────────────────────────────────────────────
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session as any).error = token.error; // Para detectar expiración en el frontend

            if (session.user) {
                (session.user as any).id = token.userId;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'una-clave-secreta-muy-segura-en-desarrollo',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
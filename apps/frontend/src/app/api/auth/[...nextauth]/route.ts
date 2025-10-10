import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"

export const runtime = 'nodejs'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if(!user) {
                    throw new Error('Invalid email or password.')
                }

                const isPasswordValid = await bcrypt.compare(credentials.password , user.password)
                if(!isPasswordValid) {
                    throw new Error('Invalid email or password.')
                }
                return { id: user.id, email: user.email }
            },
        }),
    ],
    session : {
        strategy: 'jwt',
    },
    pages: {
        signIn: 'auth/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if(token) {
                session.user.id = token.id
                session.user.email = token.email
            }
            return session
        },
    },
    secret: process.env.JWT_SECRET || 'KEY'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
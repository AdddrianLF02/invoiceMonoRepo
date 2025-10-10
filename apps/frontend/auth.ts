import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authOptions,
    
})
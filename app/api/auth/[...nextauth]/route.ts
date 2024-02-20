import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // Import below auth/prisma adapter into the authentication route and set it as the adapter property on the config object.
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

// * This auth system does not persist user data. This is not alright for public facing user apps where we store data about users.
// We can install npm @next-auth/prisma-adapter and connect database to existing auth js implementation using the package which is an adapter.
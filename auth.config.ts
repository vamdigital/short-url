/* eslint-disable require-await */
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from './prisma/prisma';
import { compareSync } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default {
  // adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      authorize: async (credentials) => {
        const { email, password } = credentials;
        // get unique user from db
        const user = await db.user.findUnique({
          where: {
            email: email as string,
          },
        });
        if (!user) {
          throw new Error('User not found');
        } else {
          const isMatch = await compareSync(password as string, user.password);
          if (!isMatch) {
            throw new Error('Incorrect password');
          } else {
            return user;
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token, user }) {
      console.log('session', { session, token });
      session.user.id = token.id as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  // ],
} satisfies NextAuthConfig;

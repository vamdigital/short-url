/* eslint-disable require-await */
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from './prisma/prisma';
import { compareSync } from 'bcryptjs';

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user.id = token.id as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.image = token.avatarUrl as string;
      console.log({ session });
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
} satisfies NextAuthConfig;

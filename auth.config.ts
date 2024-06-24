/* eslint-disable require-await */
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      let tokenName = token.firstName ?? token.name;
      let tokenAvatarUrl = token.avatarUrl ?? token.picture;
      console.log({ tokenName, tokenAvatarUrl });
      if (user) {
        token.firstName = user.firstName;
        token.name = user.name;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
        token.picture = user.image;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.firstName = token.firstName ?? (token.name as string);
      session.user.lastName = token.lastName as string;
      session.user.avatarUrl = token.avatarUrl ?? (token.picture as string);
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
} satisfies NextAuthConfig;

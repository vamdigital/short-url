/* eslint-disable require-await */
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
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
          const isMatch = await compareSync(
            password as string,
            user.password as string,
          );
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
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
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
      let firstName = token.name ? token.name.split(' ')[0] : null;
      let lastName = token.name ? token.name.split(' ')[1] : null;
      session.user.id = token.id as string;
      session.user.firstName = token.firstName ?? (firstName as string);
      session.user.lastName = token.lastName ?? (lastName as string);
      session.user.avatarUrl = token.avatarUrl ?? (token.picture as string);
      return session;
    },

    // Google
    async signIn({ account, user }) {
      // o auth providers like google
      const exists = await db.user.findFirst({
        where: {
          email: user.email as string,
        },
      });
      if (exists) {
        return true;
      }
      if (user) {
        const firstName = user.name && user.name.split(' ')[0];
        const lastName = user.name && user.name.split(' ')[1];
        await db.user.create({
          data: {
            googleId: account?.providerAccountId,
            email: user.email as string,
            firstName: firstName as string,
            lastName: lastName as string,
            avatarUrl: user.image,
          },
        });
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
} satisfies NextAuthConfig;

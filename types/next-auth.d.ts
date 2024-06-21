import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    lastName: string;
    user: {
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT extends DefaultJWT {
//     user?: {
//       firstName: string;
//       lastName: string;
//       avatarUrl: string | null;
//     };
//   }
// }

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    firstName?: string;
    lastName?: string;
    avatarUrl: string | null;
  }
}

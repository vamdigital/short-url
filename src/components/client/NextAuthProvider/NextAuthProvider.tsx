'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  session: Session | null;
};
export const NextAuthProvider = ({ children, session }: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [router, session]);
  return <SessionProvider>{children}</SessionProvider>;
};
// 'use client';

// import { Session } from 'next-auth';
// import {
//   SessionProvider as NextSessionProvider,
//   getSession,
// } from 'next-auth/react';
// import { usePathname } from 'next/navigation';
// import { ReactNode, useCallback, useEffect, useState } from 'react';

// // Retrieve user session for the app's session context
// export default function NextAuthProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [session, setSession] = useState<Session | null>(null);
//   const pathName = usePathname();

//   const fetchSession = useCallback(async () => {
//     try {
//       const sessionData = await getSession();
//       setSession(sessionData);
//     } catch (error) {
//       setSession(null);

//       if (process.env.NODE_ENV === 'development') {
//         console.error(error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     fetchSession().finally();
//   }, [fetchSession, pathName]);

//   return (
//     <NextSessionProvider session={session}>{children}</NextSessionProvider>
//   );
// }
// export { NextAuthProvider };

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components';
import { NextAuthProvider } from '@/components/NextAuthProvider/NextAuthProvider';
import { auth as sessionAuth } from '../../auth';
import { headers } from 'next/headers';

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '700'] });

export const metadata: Metadata = {
  title: 'Shorten-url',
  description: 'A utility to shorten your urls',
};

export default async function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const session = await sessionAuth();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <section className="flex w-full bg-white md:min-h-[calc(100vh-178px)]">
                {children}
                {!session && auth}
              </section>
            </main>
            <footer className="flex w-full justify-center bg-v-d-blue p-5 text-center text-white">
              <h3>Footer Content</h3>
            </footer>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}

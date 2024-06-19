import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components';
import { NextAuthProvider } from '@/components/NextAuthProvider/NextAuthProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '700'] });

export const metadata: Metadata = {
  title: 'Shorten-url',
  description: 'A utility to shorten your urls',
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <section className="flex w-full bg-white md:min-h-[calc(100vh-178px)]">
                {children}
              </section>
              {auth}
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

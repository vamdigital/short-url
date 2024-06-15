import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components';

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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
            {auth}
          </main>
          <footer className="flex w-full justify-center bg-v-d-blue p-5 text-center text-white">
            <h3>Footer Content</h3>
          </footer>
        </div>
      </body>
    </html>
  );
}

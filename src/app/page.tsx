import { auth } from '@/auth';
import { Hero, ShortUrlFormWrapper, UrlForm } from '@/components';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <section className="flex w-full flex-col items-center justify-between">
      <div className="container">
        <Hero />
        <ShortUrlFormWrapper className="mt-10">
          {session ? (
            <UrlForm />
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <p className="my-4">To get Started please login</p>
              <Link
                href={'/login'}
                className="flex rounded-3xl bg-cyan px-8 py-3 text-center text-sm font-bold text-white max-mobile:w-full"
              >
                Login
              </Link>
            </div>
          )}
        </ShortUrlFormWrapper>
      </div>
    </section>
  );
}

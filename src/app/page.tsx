import { auth } from '@/auth';
import { Hero, ShortUrlFormWrapper, UrlForm, UrlListItem } from '@/components';
import Link from 'next/link';
import db from '../../prisma/prisma';

export default async function Home() {
  const session = await auth();
  const user =
    session &&
    (await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        urls: true,
      },
    }));

  const urls = user?.urls || [];

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex w-full bg-white">
        <div className="container">
          <Hero />
        </div>
      </div>
      <ShortUrlFormWrapper className="relative top-[-10px] lg:top-[-50px]">
        {session ? (
          <div className="container max-mobile:p-0">
            <UrlForm />
          </div>
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
      <div className="mt-10 flex w-full flex-col max-mobile:mt-20">
        {urls.length > 0 &&
          urls.map((item) => (
            <UrlListItem
              key={item.id}
              originalUrl={item.originalUrl}
              shortenedUrl={item.shortenedUrl}
            />
          ))}
      </div>
    </section>
  );
}

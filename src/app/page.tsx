import { auth } from '@/auth';
import {
  Card,
  Hero,
  SectionBlock,
  ShortUrlFormWrapper,
  UrlForm,
  UrlListItem,
} from '@/components';
import Link from 'next/link';
import db from '../../prisma/prisma';

const cardData = [
  {
    id: 1,
    title: 'Brand Recognition',
    icon: 'brand-recognition',
    altText: 'Brand Recognition Icon',
    details:
      "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content",
  },
  {
    id: 2,
    title: 'Detailed Records',
    icon: 'detailed-records',
    altText: 'Detailed Records Icon',
    details:
      'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions',
  },
  {
    id: 3,
    title: 'Fully Customizable',
    icon: 'fully-customizable',
    altText: 'Fully Customizable Icon',
    details:
      'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
  },
];
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
        {session && session.user.firstName ? (
          <div className="container max-mobile:p-0">
            <UrlForm firstName={session.user.firstName} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-white">
            <p className="my-4">To get Started please login</p>
            <Link
              href={'/login'}
              className="flex justify-center rounded-3xl bg-cyan px-8 py-3 text-center text-sm font-bold text-white max-mobile:w-full"
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
      <SectionBlock
        className="my-20 md:my-28"
        title="Advanced Statistics"
        subTitle="Track how your links are performing across the web with our advanced statistics dashboard."
      />
      <div className="relative z-20 mb-36 flex gap-8 max-mobile:flex-col">
        <div className="max-mobile:display-none absolute top-1/2 h-2 w-full bg-cyan">
          &nbsp;
        </div>
        {cardData.map((item) => (
          <Card
            key={item.id}
            className="md:[&:nth-child(3)]:top-10 md:[&:nth-child(4)]:top-20"
          >
            <div className="absolute -top-8 left-7 flex">
              <Card.CardIcon
                imageSrc={`/icon-${item.icon}.svg`}
                imageAlt={item.altText}
              />
            </div>
            <Card.CardTitle cardTitle={item.title} />
            <Card.CardDetails cardDetails={item.details} />
          </Card>
        ))}
      </div>

      <ShortUrlFormWrapper className="mb-36">
        <div className="flex flex-col items-center justify-center text-white">
          <p className="my-4">Boost your links today</p>
          <Link
            href={'/'}
            className="flex justify-center rounded-3xl bg-cyan px-8 py-3 text-center text-sm font-bold text-white max-mobile:w-full"
          >
            Get Started
          </Link>
        </div>
      </ShortUrlFormWrapper>
    </section>
  );
}

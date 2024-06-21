import { auth } from '@/auth';
import { Hero } from '@/components';

export default async function Home() {
  const session = await auth();

  return (
    <section className="flex w-full flex-col items-center justify-between">
      <div className="container">
        <Hero />
      </div>
    </section>
  );
}

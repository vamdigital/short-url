import { Button } from '@/components/ui/button';
import { auth } from '../../auth';
import SessionData from '@/components/SessionData/SessionData';
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

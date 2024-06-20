import { Button } from '@/components/ui/button';
import { auth } from '../../auth';
import SessionData from '@/components/SessionData/SessionData';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  return (
    <section className="flex w-full flex-col items-center justify-between p-24">
      {session ? (
        <>
          <SessionData session={session} />
        </>
      ) : (
        <Button>Shorten Url</Button>
      )}
    </section>
  );
}

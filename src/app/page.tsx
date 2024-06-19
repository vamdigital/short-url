import { Button } from '@/components/ui/button';
import { auth, signOut } from '../../auth';

export default async function Home() {
  const session = await auth();
  return (
    <section className="flex w-full flex-col items-center justify-between p-24">
      {session && (
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button type="submit"> Sign Out</Button>
          </form>
        </>
      )}

      <Button>Shorten Url</Button>
    </section>
  );
}

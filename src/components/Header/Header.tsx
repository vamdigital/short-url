import { HeaderNav, Logo } from '@/components';
import { auth } from '../../../auth';
import Link from 'next/link';

export const Header = async () => {
  const session = await auth();

  return (
    <header className="flex w-full bg-white py-10">
      <div className="container relative flex w-full lg:items-center max-mobile:flex-col">
        <div className="flex min-w-[120px] lg:mr-10 max-mobile:flex-col">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <HeaderNav session={session} />
      </div>
    </header>
  );
};

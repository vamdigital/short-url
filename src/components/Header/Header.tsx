import { HeaderNav, Logo } from '@/components';

export const Header = () => {
  return (
    <header className="flex w-full bg-white py-10">
      <div className="max-mobile:flex-col container relative flex w-full lg:items-center">
        <div className="max-mobile:flex-col flex min-w-[120px] lg:mr-10">
          <Logo />
        </div>
        <HeaderNav />
      </div>
    </header>
  );
};

'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';

import { logout } from '@/lib/actions';
import { Session } from 'next-auth';
export const HeaderNav = ({ session }: { session: Session | null }) => {
  console.log({ session });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const navArray = ['Features', 'Pricing', 'Resources', 'Login', 'Signup'];

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const visibityClass = isVisible ? 'max-mobile:flex-col' : 'max-mobile:hidden';

  return (
    <>
      <div className="absolute right-5 flex lg:hidden">
        <Button
          type="button"
          className="rounded-3xl bg-d-violet"
          onClick={toggleVisibility}
        >
          Menu
        </Button>
      </div>
      <div
        className={`lg:flex max-mobile:mt-5 max-mobile:rounded-lg max-mobile:bg-d-violet max-mobile:p-5 max-mobile:text-white ${visibityClass} w-full justify-between gap-5`}
      >
        <div className="flex w-full">
          <ul className="flex w-full items-center gap-5 font-bold text-g-violet max-mobile:flex-col max-mobile:justify-center">
            {navArray.slice(0, 3).map((nav) => (
              <li key={nav}>
                <Link href="/" className="hover:text-v-d-blue">
                  {nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full max-mobile:mt-4 max-mobile:w-full max-mobile:border-t-[1px] max-mobile:border-t-l-gray/20 max-mobile:py-4">
          <ul className="flex w-full items-center justify-end gap-4 font-bold text-g-violet max-mobile:flex-col max-mobile:justify-center">
            {session ? (
              <li className="flex flex-col items-center justify-between">
                <form
                  action={() => {
                    logout();
                    toggleVisibility();
                  }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 rounded-full bg-gray-200"></div>
                    <p className="text-sm text-g-violet md:text-v-d-blue">
                      Welcome!
                    </p>
                    <p className="text-sm text-cyan">
                      {session.user.firstName}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="flex rounded-3xl bg-cyan px-6 py-3 text-center text-sm font-bold text-white max-mobile:w-full"
                  >
                    logout
                  </Button>
                </form>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    legacyBehavior
                    className="hover:text-v-d-blue"
                  >
                    <a onClick={() => toggleVisibility()}>Login</a>
                  </Link>
                </li>
                <li className="items-center justify-center max-mobile:flex max-mobile:w-full">
                  <Link
                    href="/signup"
                    className="rounded-3xl bg-cyan px-6 py-3 text-center text-sm font-bold text-white max-mobile:w-full"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
            {/* navArray.slice(3, 4).map((nav) => (
              <li key={nav}>
                <Link
                  href={nav === 'Login' ? '/login' : '/'}
                  className="hover:text-v-d-blue"
                >
                  {nav}
                </Link>
              </li>
            )) */}
          </ul>
        </div>
      </div>
    </>
  );
};

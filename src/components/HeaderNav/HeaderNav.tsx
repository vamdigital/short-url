'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';

export const HeaderNav = () => {
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
          className="bg-d-violet rounded-3xl"
          onClick={toggleVisibility}
        >
          Menu
        </Button>
      </div>
      <div
        className={`max-mobile:mt-5 max-mobile:rounded-lg max-mobile:bg-d-violet max-mobile:p-5 max-mobile:text-white lg:flex ${visibityClass} w-full justify-between gap-5`}
      >
        <div className="flex w-full">
          <ul className="text-g-violet max-mobile:flex-col max-mobile:justify-center flex w-full items-center gap-5 font-bold">
            {navArray.slice(0, 3).map((nav) => (
              <li key={nav}>
                <Link href="/" className="hover:text-v-d-blue">
                  {nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-mobile:mt-4 max-mobile:w-full max-mobile:border-t-[1px] max-mobile:border-t-l-gray/20 max-mobile:py-4 flex min-w-52">
          <ul className="text-g-violet max-mobile:flex-col max-mobile:justify-center flex w-full items-center justify-end gap-4 font-bold">
            {navArray.slice(3, 4).map((nav) => (
              <li key={nav}>
                <Link
                  href={nav === 'Login' ? '/login' : '/'}
                  className="hover:text-v-d-blue"
                >
                  {nav}
                </Link>
              </li>
            ))}
            <li className="max-mobile:flex max-mobile:w-full items-center justify-center">
              <Link
                href="/signup"
                className="bg-cyan max-mobile:w-full rounded-xl px-6 py-3 text-center text-sm font-bold text-white"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

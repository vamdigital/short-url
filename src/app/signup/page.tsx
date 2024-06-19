/* eslint-disable require-await */
import Link from 'next/link';
import { SignupForm } from '@/components/SignupForm/SignupForm';
import { onDataActionSignup, onFormActionSignup } from '@/lib/actions';

export default function Signup() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="container">
        <div className="mx-auto flex max-w-screen-sm flex-col">
          <h1 className="my-5 mb-10 text-4xl">Signup</h1>
          <SignupForm
            onDataAction={onDataActionSignup}
            onFormAction={onFormActionSignup}
          />
          <span>
            Already have an account?{' '}
            <Link href={'/login'} className="text-cyan">
              Login
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}

'use client';
import { LoginForm } from '@/components';
import { onDataActionLogin, onFormActionLogin } from '@/lib/actions';
// import { auth } from '../../../auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
export default function Login() {
  const { data: session } = useSession();
  console.log({ session });
  if (session) {
    redirect('/');
  }

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="container">
        <div className="mx-auto flex max-w-screen-sm flex-col">
          <h1 className="my-5 mb-10 text-4xl">Login</h1>
          <LoginForm
            onDataAction={onDataActionLogin}
            onFormAction={onFormActionLogin}
          />
        </div>
      </div>
    </main>
  );
}

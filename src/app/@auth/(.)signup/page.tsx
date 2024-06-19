'use client';
import { Modal } from '@/components';
import Link from 'next/link';
import { SignupForm } from '@/components/SignupForm/SignupForm';
import { onDataActionSignup, onFormActionSignup } from '@/lib/actions';

export default function Signup() {
  return (
    <Modal>
      <div className="container max-w-screen-sm">
        <div className="mx-auto flex flex-col py-10">
          <h1 className="my-5 mb-10 text-4xl">Signup</h1>
          <SignupForm
            onDataAction={onDataActionSignup}
            onFormAction={onFormActionSignup}
          />
          <p>Already have an account?</p> <Link href={'/login'}>Login</Link>
        </div>
      </div>
    </Modal>
  );
}

import { Modal, SignupForm } from '@/components';
import Link from 'next/link';
import { onFormActionSignup } from '@/lib/actions';

export default function Signup() {
  return (
    <Modal>
      <div className="container max-w-screen-sm">
        <div className="mx-auto flex flex-col py-10">
          <h1 className="my-5 mb-10 text-4xl">Signup</h1>
          <SignupForm onFormAction={onFormActionSignup} />
          <p>Already have an account?</p> <Link href={'/login'}>Login</Link>
        </div>
      </div>
    </Modal>
  );
}

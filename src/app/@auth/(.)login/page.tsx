'use client';
import { Modal } from '@/components';
import { LoginForm } from '@/components/';
import { onFormActionLogin } from '@/lib/actions';
import { usePathname } from 'next/navigation';

export default function Login() {
  const pathName = usePathname();
  const paths = ['/login'];
  if (!paths.includes(pathName)) {
    return null;
  }
  return (
    <Modal>
      <div className="container max-w-screen-sm">
        <div className="mx-auto flex flex-col py-10">
          <h1 className="my-5 mb-10 text-4xl">Login</h1>
          <LoginForm onFormAction={onFormActionLogin} />
        </div>
      </div>
    </Modal>
  );
}

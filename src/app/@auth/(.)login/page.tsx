import { Modal } from '@/components';
import { LoginForm } from '@/components/';
import { onDataActionLogin, onFormActionLogin } from '@/lib/actions';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await auth();
  if (session) {
    return redirect('/');
  }
  return (
    <Modal>
      <div className="container max-w-screen-sm">
        <div className="mx-auto flex flex-col py-10">
          <h1 className="my-5 mb-10 text-4xl">Login</h1>
          <LoginForm
            onDataAction={onDataActionLogin}
            onFormAction={onFormActionLogin}
          />
        </div>
      </div>
    </Modal>
  );
}

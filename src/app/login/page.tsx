import { GoogleForm, LoginForm } from '@/components';
import { onFormActionLogin } from '@/lib/actions';

export default function Login() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="container">
        <div className="mx-auto flex max-w-screen-sm flex-col">
          <h1 className="my-5 mb-10 text-4xl">Login</h1>
          <LoginForm onFormAction={onFormActionLogin} />
          <div className="flex">
            {/** Google Provider */}
            <div className="flex-col">
              <GoogleForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

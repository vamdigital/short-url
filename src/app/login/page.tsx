import { OAuthLoginForm, LoginForm } from '@/components';
import { onFormActionLogin, oAuthActionLogin } from '@/lib/actions';
import Image from 'next/image';

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
              <OAuthLoginForm
                formAction={async () => {
                  'use server';
                  await oAuthActionLogin({ provider: 'google' });
                }}
              >
                <Image
                  src="/google-icon.svg"
                  width={20}
                  height={20}
                  alt="Google Login Logo"
                />
              </OAuthLoginForm>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

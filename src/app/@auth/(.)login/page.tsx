'use client';
import Image from 'next/image';
import { OAuthLoginForm, Modal } from '@/components';
import { LoginForm } from '@/components/';
import { oAuthActionLogin, onFormActionLogin } from '@/lib/actions';
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
          <div className="flex">
            {/** Google Provider */}
            <div className="flex gap-2">
              <div className="flex-col">
                <OAuthLoginForm
                  formAction={() => oAuthActionLogin({ provider: 'google' })}
                >
                  <Image
                    src="/google-icon.svg"
                    width={20}
                    height={20}
                    alt="Google Login Logo"
                  />
                </OAuthLoginForm>
              </div>
              <div className="flex-col">
                <OAuthLoginForm
                  formAction={() => oAuthActionLogin({ provider: 'github' })}
                >
                  <Image
                    src="/github-icon.svg"
                    width={20}
                    height={20}
                    alt="Github Login Logo"
                  />
                </OAuthLoginForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

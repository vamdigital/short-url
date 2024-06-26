import { Button } from '@/components/ui/button';
import { oAuthActionLogin } from '@/lib/actions';
// import Image from 'next/image';

export const OAuthLoginForm = ({
  children,
  formAction,
}: {
  children: React.ReactNode;
  formAction: string | ((formData: FormData) => void) | undefined;
}) => {
  return (
    <form action={formAction} className="flex h-5 w-5">
      <Button className="h-5 w-5 bg-transparent p-0 hover:bg-transparent">
        {children}
        {/* <Image
          src="/google-icon.svg"
          width={20}
          height={20}
          alt="Google Login Logo"
        /> */}
      </Button>
    </form>
  );
};

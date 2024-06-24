import { Button } from '@/components/ui/button';
import { googleActionLogin } from '@/lib/actions';
import Image from 'next/image';

export const GoogleForm = () => {
  return (
    <form action={googleActionLogin} className="flex h-5 w-5">
      <Button className="h-5 w-5 bg-transparent p-0 hover:bg-transparent">
        <Image
          src="/google-icon.svg"
          width={20}
          height={20}
          alt="Google Login Logo"
        />
      </Button>
    </form>
  );
};

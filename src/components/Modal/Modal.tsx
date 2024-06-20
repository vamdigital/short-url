'use client';

import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
type Props = {
  children: React.ReactNode;
};
export const Modal = ({ children }: Props) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="overflow-y-hidden">
        <DialogContent className="w-full max-w-3xl">
          <DialogTitle className="sr-only">
            Modal for Login / Signup
          </DialogTitle>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

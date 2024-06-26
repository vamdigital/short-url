'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export const SubmitButton = () => {
  const { pending: isPending } = useFormStatus();
  const pendingClassName = isPending ? 'bg-gray-400' : '';
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={`h-11 flex-col rounded-lg ${pendingClassName}`}
    >
      {isPending ? 'Shortening' : 'Shorten it!'}
    </Button>
  );
};

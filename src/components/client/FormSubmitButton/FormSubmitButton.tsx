'use client';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

type Props = {
  buttonText: string;
  loadingText: string;
};
export const FormSubmitButton = ({ buttonText, loadingText }: Props) => {
  const { pending } = useFormStatus();
  return <Button type="submit">{pending ? loadingText : buttonText}</Button>;
};

'use client';
import { SubmitButton } from '@/components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { schema, shortenUrl } from '@/actions'
import { urlFormSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { shortenUrl } from '@/lib/shortenUrlAction';
import { useFormState } from 'react-dom';
import { toast } from 'react-hot-toast';
import { Session } from 'next-auth';
import { User } from '@prisma/client';

type FormState = z.infer<typeof urlFormSchema>;

export const UrlForm = ({ firstName }: { firstName: string | undefined }) => {
  const [state, formAction] = useFormState(shortenUrl, {
    message: '',
    success: false,
    resetKey: Date.now().toString(),
  });

  const {
    register,
    formState: { errors },
    clearErrors,
    setFocus,
  } = useForm<FormState>({
    defaultValues: {
      url: '',
    },
    resolver: zodResolver(urlFormSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (firstName) {
      toast(`Hi ${firstName}!`, { icon: '👋', id: firstName });
    }
  }, [firstName]);
  useEffect(() => {
    setFocus('url');
    if (state.success) {
      formRef?.current?.reset();
      toast.success(state.message, { id: 'urlFormSuccess' });
    } else if (!state.success && state.data) {
      toast.error(state.message);
    }
  }, [setFocus, state.data, state.message, state.success]);

  const borderColorClass = errors.url?.message
    ? 'border-red'
    : state.success
      ? 'border-green-500'
      : 'border-gray-300';

  return (
    <div className="flex w-full flex-col items-center justify-between md:w-full">
      <form
        key={state.resetKey}
        ref={formRef}
        action={formAction}
        className="flex w-full items-center justify-between"
      >
        <div className="w-full items-center justify-between md:flex-col">
          <label htmlFor="url" className="sr-only">
            Enter Url
          </label>
          <input
            type="string"
            {...register('url')}
            onFocus={() => clearErrors()}
            id="url"
            placeholder="Shorten a link here..."
            className={`min-h-11 border md:mr-3 max-mobile:mb-4 max-mobile:w-full max-mobile:flex-col ${borderColorClass} px-3 py-2 md:w-[70%] md:px-5 lg:w-[86%]`}
          />
          <SubmitButton />
        </div>
      </form>

      {errors.url?.message && (
        <p className="flex pt-2 text-sm text-red">{errors.url?.message}</p>
      )}
    </div>
  );
};

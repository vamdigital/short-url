'use client';

import { useFormState } from 'react-dom';
import { useRef, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginFormSchema } from '@/lib/formSchema';

type LoginSchema = z.infer<typeof loginFormSchema>;

type Props = {
  onFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof loginFormSchema>;
      issues?: string[];
    },
    data: FormData,
  ) => Promise<{
    message: string;
    user?: z.infer<typeof loginFormSchema>;
    issues?: string[];
  }>;
};

export const LoginForm = ({ onFormAction }: Props) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useFormState(onFormAction, {
    message: '',
  });

  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      {state?.message && <FormMessage>{state.message}</FormMessage>}
      <form
        action={() =>
          startTransition(async () => {
            await formAction(new FormData(formRef.current!));
          })
        }
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            startTransition(async () => {
              await formAction(new FormData(formRef.current!));
            });
          })(evt);
        }}
        className="spacy-y-8 mb-5"
      >
        <div className="mb-5 flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Enter your email</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Enter your password</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

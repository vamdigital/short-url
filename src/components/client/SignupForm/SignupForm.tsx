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
import { signupFormSchema } from '@/lib/formSchema';

type SignupSchema = z.infer<typeof signupFormSchema>;
type Props = {
  onFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof signupFormSchema>;
      issues?: string[];
    },
    data: FormData,
  ) => Promise<{
    message: string;
    user?: z.infer<typeof signupFormSchema>;
    issues?: string[];
  }>;
};
export const SignupForm = ({ onFormAction }: Props) => {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      avatarUrl: '',
    },
  });

  const [state, formAction] = useFormState(onFormAction, {
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  console.log({ isPending });
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
          <div className="flex w-full gap-3">
            <div className="w-full flex-col">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Your first name</FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-col">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Your last name</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="hello@world.com" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Your email</FormDescription>
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Your password</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Your Profile Image</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'creating...' : 'Signup'}
        </Button>
      </form>
    </Form>
  );
};

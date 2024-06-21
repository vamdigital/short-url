'use client';

import { useFormState } from 'react-dom';
import { useRef } from 'react';

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

  return (
    <Form {...form}>
      {state.message && <FormMessage>{state.message}</FormMessage>}
      <form
        action={formAction}
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
        className="spacy-y-8 mb-5"
      >
        <div className="mb-5 flex flex-col gap-5">
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

/* eslint-disable require-await */
'use server';
import { z } from 'zod';
import { loginFormSchema, signupFormSchema } from './formSchema';
import db from '../../prisma/prisma';
import { revalidatePath } from 'next/cache';
import { signIn } from '../../auth';
import { hash } from 'bcryptjs';

export const onDataActionSignup = async (
  data: z.infer<typeof signupFormSchema>,
) => {
  const parsed = signupFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid data',
      error: parsed.error,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  } else {
    const email = parsed.data.email;
    const password = parsed.data.password;
    const hashedPassword = await hash(password, 10);
    await db.user.create({
      data: {
        email,
        password: password,
        name: parsed.data.name,
        avatarUrl: parsed.data.avatarUrl,
      },
    });
    revalidatePath('/signup');
    return {
      message: 'User Registered',
      data: parsed.data,
    };
  }
};

export const onFormActionSignup = async (
  prevState: {
    message: string;
    user?: z.infer<typeof signupFormSchema>;
    issues?: string[];
  },
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const parsed = await signupFormSchema.safeParse(data);
  if (parsed.success) {
    const exists = await db.user.findFirst({
      where: {
        email: parsed.data.email,
      },
    });
    if (exists) {
      return {
        message: 'User already exists',
        error: parsed.error,
      };
    }
    const email = parsed.data.email;
    const password = parsed.data.password;
    const hashedPassword = await hash(password, 10);
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: parsed.data.name,
        avatarUrl: parsed.data.avatarUrl,
      },
    });
    revalidatePath('/signup');
    return {
      message: 'User Registered',
      user: parsed.data,
    };
  } else {
    return {
      message: 'Invalid data',
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

export const onDataActionLogin = async (
  data: z.infer<typeof loginFormSchema>,
) => {
  const parsed = loginFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      message: 'Login Failed. Invalid data',
      error: parsed.error,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  } else {
    revalidatePath('/login');
    return {
      message: 'Successfully Logged in',
      data: parsed.data,
    };
  }
};

export const onFormActionLogin = async (
  prevState: {
    message: string;
    user?: z.infer<typeof loginFormSchema>;
    issues?: string[];
  },
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  const parsed = await loginFormSchema.safeParse(data);
  if (parsed.success) {
    try {
      await signIn('credentials', {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
      });
      // Response.redirect(new URL('/dashboard', 'http://localhost:3000'));
      revalidatePath('/login');
      return {
        message: 'Successfully Logged in',
        user: parsed.data,
      };
    } catch (error) {
      return {
        message: `Login Failed please check your password or email`,
      };
    }
  } else {
    return {
      message: 'Login Failed. Invalid data',
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

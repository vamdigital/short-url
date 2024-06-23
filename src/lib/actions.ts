'use server';
import { z } from 'zod';
import { loginFormSchema, signupFormSchema } from './formSchema';
import db from '../../prisma/prisma';
import { revalidatePath } from 'next/cache';
import { signOut, signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { hash } from 'bcryptjs';
import fs from 'node:fs/promises';

export const onFormActionSignup = async (
  prevState: {
    message: string;
    user?: z.infer<typeof signupFormSchema>;
    issues?: string[];
  },
  formData: FormData,
) => {
  const data = Object.fromEntries(formData);
  /** File Upload Service  */
  const file = data.avatarUrl ? (data.avatarUrl as File) : null;
  const arrayBuffer = file ? await file.arrayBuffer() : null;
  const buffer = arrayBuffer ? new Uint8Array(arrayBuffer) : null;
  if (buffer && file) {
    await fs.writeFile(`./public/uploads/${file.name}`, buffer);
  }

  const fileUrl = file ? `./public/uploads/${file.name}` : null;

  /** End of File Upload */
  const newData = { ...data, avatarUrl: fileUrl?.replace('./public', '') }; // to transform the data for avatarUrl

  const parsed = await signupFormSchema.safeParse(newData);
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
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        avatarUrl: parsed.data.avatarUrl,
      },
    });
    revalidatePath('/signup');
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
    });

    return {
      message: 'User Registered',
      user: parsed.data,
    };
  } else {
    return {
      message: `Invalid data - ${parsed.error.issues.map((issue) => issue.message)}`,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

export const onFormActionLogin = async (
  _prevState: {
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
      });
      return {
        message: 'Successfully Logged in',
        user: parsed.data,
      };
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
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

export const logout = async () => {
  await signOut();
};

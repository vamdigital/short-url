/* eslint-disable require-await */
'use server';

import { urlFormSchema } from '@/lib/formSchema';
import axios from 'axios';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createUrl } from '@/lib/createUrl';
import { auth } from '@/auth';
import db from '../../prisma/prisma';

const headers = {
  'Content-Type': 'application/json',
  // apikey: 'c6cf084ce033410fb84f3a1283b8ae37'
};

export type FormDataType = {
  url: 'string';
};
const fetcher = async (url: string) => {
  // let endpoint = 'https://api.rebrandly.com/v1/links'
  let endpoint = 'https://api.encurtador.dev/encurtamentos';
  let linkRequest = {
    url,
  };
  const apiCall = {
    method: 'post',
    url: endpoint,
    data: linkRequest,
    headers: headers,
  };
  let apiResponse = await axios(apiCall);
  let link = apiResponse.data;
  return link.urlEncurtada;
};

export const shortenUrl = async (
  _prevState: {
    message?: string;
    url?: z.infer<typeof urlFormSchema>;
    success: boolean;
    resetKey: string;
    issues?: string[];
  },
  formData: FormData,
) => {
  const session = await auth();
  const formD = Object.fromEntries(formData);
  const result = urlFormSchema.safeParse(formD);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!result.success) {
    return {
      success: false,
      message: result.error.errors[0].message,
      resetKey: Date.now().toString(),
    };
  }
  try {
    if (session && session.user.email) {
      const userFromDb = await db.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      const res = await fetcher(result.data.url);
      await createUrl({
        originalUrl: result.data.url,
        shortenedUrl: res,
        user: userFromDb,
      });
      revalidatePath('/');
      return {
        success: true,
        message: `successfully shortened ${result.data.url}`,
        data: res,
        resetKey: Date.now().toString(),
      };
    }
  } catch (e: unknown) {
    return {
      success: false,
      message: `failed to shorten ${result.error}`,
      resetKey: Date.now().toString(),
    };
  }

  return {
    success: true,
    message: `successfully shortened ${result.data.url}`,
    resetKey: Date.now().toString(),
  };
};

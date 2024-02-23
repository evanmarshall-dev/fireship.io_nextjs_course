'use server';
// Server actions are composable, which means they do not have to be defined directly inside the server component.
// This file exports multiple server functions.
// A benefit of this is to put use server at the top and it will apply to all functions in this file.
// * Most important is that we can now reuse these actions in different components.
import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';

export async function like(id: string) {
  await kv.incr(`likes:${id}`);
  revalidatePath(`/dogs/${id}`);
}

export async function dislike(id: string) {
  await kv.decr(`likes:${id}`);
  revalidatePath(`/dogs/${id}`);
}

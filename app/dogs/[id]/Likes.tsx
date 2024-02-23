'use client';

// You can call upon server components inside client components.
import { like, dislike } from './actions';
import { useTransition } from 'react';

export default function Likes({ id }: any) {
  // Use transition is important here because it allows us to update state, server component and UI all in one round trip.
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <button onClick={() => startTransition(() => like(id))}>😍</button>

      <button onClick={() => startTransition(() => dislike(id))}>💩</button>
    </div>
  );
}

// This is a client component.
'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

// In the UI we have two buttons. If the user is following this user then we render a button to unfollow, otherwise we will render a follow button.
export default function FollowClient({ targetUserId, isFollowing }: Props) {
  // We need to think about the loading state and optimistic updates.
  // Import client side tools like nextRouter and useTransition from react. Use transition is a special hook that tells us if we still have a loading state that is pending.
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Also we can add state to the component for is fetching so that we know when we are waiting for the server to respond.
  const [isFetching, setIsFetching] = useState(false);
  // Then we will create some derive state by combining is fetching and is pending together into is mutating value.
  const isMutating = isFetching || isPending;

  // We can implement our event handlers for when a user clicks a button.
  const follow = async () => {
    // Set fetching to true.
    setIsFetching(true);
    // Make a request using fetch to the API follow route using POST method. It will set the targetUserId to the body of the request and create a new relationship in the database.
    const res = await fetch('/api/follow', {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Once we have the response we can set fetching to false.
    setIsFetching(false);

    console.log(res);
    // Now start transition comes into play. This allows us to make a new request to the sever for the route we are currently on, which will once again check if the target user follows the current user.
    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route.
      // - Re-fetches data requests and re-renders server components.
      // - Sends the updated react server component payload to the client.
      // - The client merges the payload without losing unaffected.
      // client side react state or browser state.
      router.refresh();
    });
  };

  const unfollow = async () => {
    setIsFetching(true);
    // For unfollow it will fetch to the delete endpoint with the target user ID as a URL search param.
    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: 'DELETE',
    });

    setIsFetching(false);
    // To consider: each time the relationship changes we are refreshing the entire route, which could be a problem if we had multiple follow buttons on the same page. This would re-render each of them which would be in-efficient. A better solution would be to make the entire button a client component.
    startTransition(() => router.refresh());
  };

  if (isFollowing) {
    return (
      // Now use isMutating variable to show different text on the button depending on whether or not an update is in progress.
      // You can also use this for optimistic updates to change the unfollow button to follow even when you are not sure the server has updated that value yet.
      <button onClick={unfollow}>{!isMutating ? 'Unfollow' : '...'}</button>
    );
  } else {
    return <button onClick={follow}>{!isMutating ? 'Follow' : '...'}</button>;
  }
}

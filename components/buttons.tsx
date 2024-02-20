'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

// This is new because this component file has multiple components when most people only have one component per file. The advantages of this are being able to export multiple components in a single line and you can apply use client once and it applies to all components in this file.

// Sign in button is a bit more complex than sign out because we want to show the user avatar if they are signed in and just a button if they are signed out.
export function SignInButton() {
  // Use session hook to grab session and status
  const { data: session, status } = useSession();
  console.log(session, status);

  // Show loading indicator if not authenticated.
  if (status === 'loading') {
    return <>...</>;
  }

  // If authenticated we will add a link to the dashboard as well as an image for the user's URL.
  // * To use remote images with next image you need to update your next.config.js to provide the remote URL for those images.
  if (status === 'authenticated') {
    return (
      <Link href={'/dashboard'}>
        <Image
          src={session.user?.image ?? '/mememan.webp'}
          width={32}
          height={32}
          alt='Your Name'
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}></button>;
}

// Implement the sign out button by binding the onClick event to the sign out function that is provided by next auth.
export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}

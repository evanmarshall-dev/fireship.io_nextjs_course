'use client';

// Imports the session provider from next auth.
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

// Exports a function that has a children prop, which is wrapped by the session provider.
// * We then import this component into our root layout and use it to wrap the entire JSX.
// * We do not use the session component directly in the root layout because it is using client-side features without specifying it is a client component and this will throw an error.
export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

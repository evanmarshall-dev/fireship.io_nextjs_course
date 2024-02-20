'use client';

// * THIS IS CLIENT-SIDE, BUT IT CAN ALSO BE DONE SERVER-SIDE.
// Imports the use session hook from next-auth. This allows us to access the current session as well as the user status, which will be authenticated loading or un-authenticated.
import { useSession } from 'next-auth/react';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  console.log(session, status);

  // If user status is authenticated then we show the props children otherwise we return a blank UI.
  if (status === 'authenticated') {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

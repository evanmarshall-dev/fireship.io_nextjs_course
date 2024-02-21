import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProfileForm } from './ProfileForm';
import { SignOutButton } from '@/components/buttons';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Check to see if the session from above is null and if it is we will redirect to the sign in page.
  if (!session) {
    redirect('/api/auth/signin');
  }

  // If the session is not null we will grab the users email.
  // Then use the assertion operator here.
  const currentUserEmail = session?.user?.email!;
  // Then use prisma to find a unique record where a users email equals the current user email.
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  // Once we have the user record from above we will render a form client side that allows the user to modify their one profile. This will be created in ProfileForm.tsx.
  return (
    <>
      <h1>Dashboard</h1>
      <SignOutButton />
      <ProfileForm user={user} />
    </>
  );
}

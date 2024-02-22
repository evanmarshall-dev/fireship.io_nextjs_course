// This is a server component.
import { getServerSession } from 'next-auth';
import FollowClient from './FollowClient';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// First, we will get the current user and figure out if they are following a target user.

interface Props {
  targetUserId: string;
}

// Export a default function and take targetUserId as a prop.
export default async function FollowButton({ targetUserId }: Props) {
  // Get server session.
  const session = await getServerSession(authOptions);
  // Use prisma to get current user ID.
  const currentUserId = await prisma.user
    .findFirst({ where: { email: session?.user?.email! } })
    .then((user) => user?.id!);
  // Determine if that user is following the target user.
  // Use prisma to make a query to the follows table to find the first record that has matching IDs.
  const isFollowing = await prisma.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });
  // Pass the above data down to a child component that will allow the end user to interact with the button.
  // The double bang (!!) in front og isFollowing coverts it into a boolean value.
  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}

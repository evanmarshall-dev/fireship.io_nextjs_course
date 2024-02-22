import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

// * This route is an API route to create and delete the follow/follower relationships. This creates a backend API for managing followers.
// POST to create a new relationship (i.e. A user follows a user).
export async function POST(req: Request) {
  // Grab current session for current user's email address.
  const session = await getServerSession(authOptions);
  // Grab target user ID from the request body.
  const currentUserEmail = session?.user?.email!;
  // The target user ID is the ID of the user that the current one is trying to follow.
  const { targetUserId } = await req.json();

  // By default the session won't give us the user ID so we can use prisma to fetch it from the database with the findUnique method.
  // This gives us the ID of the current user and the user that is to be followed.
  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // Use prisma to access the follow table and then use create method to create a new record to represent the new relationship with the follower ID as the current user and following ID as the target.
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  // Finally, return JSON from this endpoint.
  return NextResponse.json(record);
}

// DELETE to delete a relationship (i.e. A user un-follows a user).
export async function DELETE(req: NextRequest) {
  // Similar as above, but instead of getting the target user ID from the request body, we will use next request to get that value from the URL as a search parameter.
  // That means we will pass in the target user ID in the URL itself when making a request to this endpoint.
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const targetUserId = req.nextUrl.searchParams.get('targetUserId');

  // The below request helps by auto parsing the URL on the request so that we can easily access the search parameters that we need.
  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // Use the delete method on the follows table to find the relationship where we have matching follower and following ID.
  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId!,
      },
    },
  });

  return NextResponse.json(record);
}

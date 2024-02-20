import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Export a function of a GET request.
export async function GET(request: Request) {
  // Query all the users from the database and return them as a JSON object. With prisma we do that by accessing the user model on the database. Once we have the user model we can use the query method of findMany, which will return all the records from the database and formatted as a JS object.
  const users = await prisma.user.findMany();

  console.log(users);

  // Use next response to return the users object as JSON.
  return NextResponse.json(users);
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

// Takes the request object as an argument allowing us to access data about the request.
export async function PUT(req: Request) {
  // First, authenticate the request using the get server session method.
  const session = await getServerSession(authOptions);
  // Make sure we have access to the user's email.
  // You want to make sure you access the user email on the server and not allow the user to pass it in client side. This could lead a hacker to use any email they want to update the record of another user.
  const currentUserEmail = session?.user?.email!;

  // Access request body, which is the data that was submitted in the form.
  const data = await req.json();
  // We also need to convert the age value to a number because in JSON it is a string.
  data.age = Number(data.age);

  // Use prisma to update the record where the email equals the current user email.
  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    // Also good to do some validation to make sure the data format fits to whatever is acceptable in the database.
    data,
  });

  // Return the user as JSON.
  return NextResponse.json(user);
}

// Export a function of a GET request.
// ? export async function GET(request: Request) {
// Query all the users from the database and return them as a JSON object. With prisma we do that by accessing the user model on the database. Once we have the user model we can use the query method of findMany, which will return all the records from the database and formatted as a JS object.
// ? const users = await prisma.user.findMany();

// ? console.log(users);

// Use next response to return the users object as JSON.
// ? return NextResponse.json(users);
// ? }

// * With NextJS 13 you do not need API routes to fetch data. You can access prisma directly from a server component as opposed to making a fetch call to an API route.

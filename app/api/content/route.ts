import { NextResponse } from 'next/server';

const posts = [
  {
    title: 'Lorem Ipsum',
    slug: 'lorem-ipsum',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam consectetur facere eius sunt, id itaque quia vero amet quidem omnis, velit nihil quasi assumenda ex ipsa eum neque laudantium eaque.',
  },
  {
    title: 'Dolor Sit Amet',
    slug: 'dolor-sit-amet',
    content:
      'Dolor sit amet consectetur adipisicing elit. Voluptatibus, quisquam! Nisi, quis. Voluptatem, quia. Quisquam, quae. Voluptatibus, quisquam! Nisi, quis.',
  },
  {
    title: 'Consectetur Adipiscing',
    slug: 'consectetur-adipiscing',
    content:
      'Consectetur adipiscing elit. Sed commodo, velit ut aliquam laoreet, ex sapien tempor nunc, ac venenatis nunc augue vel nibh.',
  },
  {
    title: 'Elit Eiusmod Tempor',
    slug: 'elit-eiusmod-tempor',
    content:
      'Elit eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Duis Aute Irure',
    slug: 'duis-aute-irure',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

// Goal of the API endpoint is to return the above data as JSON.
// At the top of this file we import NextResponse from next/server.
// Then we create a GET endpoint by exporting a function named GET.
// Inside the body of the GET function we can do anything we want on the server such as retrieve data from a database and use the NextResponse class to send a JSON response.
// If we got to localhost:3000/api/content we will see a JSON object.
export async function GET() {
  return NextResponse.json(posts);
}

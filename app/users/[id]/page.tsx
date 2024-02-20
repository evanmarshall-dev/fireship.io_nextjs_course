// Create a dynamic route for each user profile.
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

// Meta data function.
// Same call to prisma using findUnique so that we can grab the dynamic data to generate the meta data. Such as, interpolating the user's name into the title of the webpage like below.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

// Export a server component, but this one will take props to give us access to the ID params in the URL. The URL will correspond to the ID in user database. This allows us to use prisma in the server component to grab the unique user row from the users table using the findUnique method below.
export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  // Once we have the user record from above prisma call we can then destruct user data such as name, bio and image and use those fields directly in the JSX below.
  const { name, bio, image } = user ?? {};

  // This route is extremely dynamic because a user profile can change at any moment.
  // * We will not be able to hardcode user meta data so instead we will export a generate meta data function.
  return (
    <div>
      <h1>{name}</h1>

      <Image
        width={300}
        height={300}
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>
    </div>
  );
}

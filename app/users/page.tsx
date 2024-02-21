// * With NextJS 13 you do not need API routes to fetch data. You can access prisma directly from a server component as opposed to making a fetch call to an API route.
import UserCard from '@/components/UserCard/UserCard';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export default async function Users() {
  // ! Introduce an error below to test error.tsx.
  // ? throw new Error('This is an error');
  // Same call we made in the API route: /api/users/route.ts.
  const users = await prisma.user.findMany();

  return (
    <div className={styles.grid}>
      {/* Loop over the array of users. */}
      {users.map((user) => {
        // The rendering a shared server component called UserCard.
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}

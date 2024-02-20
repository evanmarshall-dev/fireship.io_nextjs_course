import Image from 'next/image';
import Link from 'next/link';
import styles from './NavMenu.module.css';
import { SignInButton, SignOutButton } from '../buttons';

// Keep this as a server component for SEO. If we want something dynamic/interactive, such as a login button, which requires a client component then we will create new components on the leaves of the component tree to accomplish this.
// ? There is a component folder in the root of the project. We should put components in the component folder if we plan to share said component among multiple pages.

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <Image
          src='/next.svg'
          width={216}
          height={30}
          alt='Web Developer: Evan Marshall logo'
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/services'}>Services</Link>
        </li>
        <li>
          <Link href={'/projects'}>Projects</Link>
        </li>
        <li>
          <Link href={'/contact'}>Contact</Link>
        </li>
        <li>
          {/* NavMenu is a server component whereas the SignInButton is a client component, therefore we are putting client components on the leaves of the component tree. */}
          <SignInButton />
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

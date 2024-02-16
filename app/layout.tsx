import NavMenu from '../components/(navigation)/NavMenu';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Developer: Evan Marshall',
  description:
    'I design, build and maintain businesses online. Whether it is branding, updates, or full website rebuilds; I am your web developer. Contact me to discuss how you want to get your business working for you online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}

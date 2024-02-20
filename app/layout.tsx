import NavMenu from '../components/(navigation)/NavMenu';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from './AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This gives us access to the current user anywhere in the client-side application.
    <AuthProvider>
      <html lang='en'>
        <body className={inter.className}>
          <NavMenu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

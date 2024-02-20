import NavMenu from '../components/(navigation)/NavMenu';
import { Open_Sans } from 'next/font/google';
// ? import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import AuthProvider from './AuthProvider';

// ? const inter = Inter({ subsets: ['latin'] });
const oSans = Open_Sans({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This gives us access to the current user anywhere in the client-side application.
    <AuthProvider>
      <html lang='en'>
        <body className={oSans.className}>
          <NavMenu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

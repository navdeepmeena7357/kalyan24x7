import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AppDataProvider } from '@/context/AppDataContext';
import { WalletProvider } from '@/context/WalletContext';
import { UserProvider } from '@/context/UserContext';
import { PaymentProvider } from '@/context/PaymentContext';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kalyan 24x7',
  description: 'Kalyan 24x7 - Online Matka Play',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AppDataProvider>
        <WalletProvider>
          <UserProvider>
            <PaymentProvider>
              <html lang="en">
                <body
                  className={`${font.className} font-semibold  antialiased bg-gray-50`}
                >
                  {children}
                </body>
              </html>
            </PaymentProvider>
          </UserProvider>
        </WalletProvider>
      </AppDataProvider>
    </AuthProvider>
  );
}

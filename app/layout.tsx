import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/components/Providers';
import './globals.css';

const satoshi = localFont({
  src: '../fonts/Satoshi.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Look Memes | Home',
  description: 'Homepage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <Providers>
          <div className="wrapper bg-main">
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}

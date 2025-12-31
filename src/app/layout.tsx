import type { Metadata } from 'next';
import { Providers } from './providers';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'OnlineShop App',
  description: 'Modern e-commerce application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <header className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
              <Link href="/" className="font-semibold">
                OnlineShop
              </Link>

              <Link href="/cart" className="text-sm">
                Cart
              </Link>
            </div>
          </header>

          {children}
        </Providers>
      </body>
    </html>
  );
}

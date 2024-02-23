// Modules
import { ThemeModeScript } from 'flowbite-react';

// Types
import type { Metadata } from 'next';

// Styles
// import { Inter } from 'next/font/google';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Quiz',
    template: '%s | Quiz',
  },
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <ThemeModeScript mode="auto" />
      </head>
      <body className="bg-white dark:bg-gray-900">{children}</body>
    </html>
  );
}

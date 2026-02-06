import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import DoodleBackground from '@/components/doodle-background';
import FloatingFlowers from '@/components/floating-flowers';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Eternal Echoes',
  description: 'Una historia de amor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased h-full', 'bg-background')}>
        <DoodleBackground />
        <FloatingFlowers />
        <main className="relative z-10 h-full">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

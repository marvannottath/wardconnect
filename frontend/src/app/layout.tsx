import type { Metadata, Viewport } from 'next';
import './globals.css';
import { WardProvider } from '@/context/WardContext';
import { WardHeader } from '@/components/WardHeader';
import { BottomNav } from '@/components/BottomNav';
import { ProfileModal } from '@/components/ProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { NetworkStatusListener } from '@/components/NetworkStatusListener';

export const metadata: Metadata = {
  title: 'WardCare / WardConnect - Digital Ward Platform',
  description: 'Hyperlocal civic grievances, emergency care, skilled worker directory, blood network & medical equipment bank for Kerala Wards.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 antialiased pb-20 lg:pb-10 selection:bg-emerald-100 selection:text-emerald-900 min-h-screen">
        <WardProvider>
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <WardHeader />
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
            <BottomNav />
            <ProfileModal />
            <AuthModal />
            <NetworkStatusListener />
          </div>
        </WardProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeController } from '@/components/theme/ThemeController';

export const metadata: Metadata = {
  title: 'ChronosAI — AI Fleet Quota & Financial Reset Tracker',
  description:
    'Dedicated Android PWA and Cross-Platform Desktop dashboard for managing AI agent reset cycles (Antigravity weekly, Claude Code 5h rolling), multi-account fleets, and financial subscriptions.',
  manifest: '/manifest.json',
  appleWebApp: false, // Strict Zero iOS Rule (Rule 8.1)
  icons: {
    icon: '/icon-192.svg',
    shortcut: '/icon-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f43f5e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="cute" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased min-h-screen selection:bg-rose-500 selection:text-white pb-20 md:pb-8">
        <ThemeController />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration error:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Welcome to great Giri Galan Magic Show',
  description: 'Welcome to great Giri Galan Magic Show',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

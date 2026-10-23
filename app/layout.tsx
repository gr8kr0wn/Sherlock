import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SolSherlock — Wallet relationship detective', description: 'Explore public Solana wallet activity with evidence-backed insights.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }

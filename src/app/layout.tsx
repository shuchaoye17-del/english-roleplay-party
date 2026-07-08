import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'English Roleplay Party',
  description: '语音优先的英语角色派对 App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

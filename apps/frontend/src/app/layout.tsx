import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChangeForge – Gestão de Mudança Organizacional',
  description:
    'Plataforma inteligente de Change Management: monitore adoção, reduza resistência e gere nudges comportamentais com IA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">{children}</body>
    </html>
  );
}

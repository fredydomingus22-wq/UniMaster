import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GarimpoCloud | Comunidades para garimpeiros e estudantes",
  description:
    "GarimpoCloud conecta garimpeiros e estudantes com comunidades privadas, cursos, aulas em vídeo e eventos ao vivo, tudo com Supabase e Next.js 14.",
  metadataBase: new URL("https://garimpocloud.example"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.2),transparent_25%)] blur-3xl"
          aria-hidden
        />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}

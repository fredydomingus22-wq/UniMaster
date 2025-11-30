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
      <body>
        <div className="relative overflow-hidden">
          <div className="glow" aria-hidden />
          {children}
        </div>
      </body>
    </html>
  );
}

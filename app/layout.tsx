import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Central Juliana 1020 | Materiais oficiais";
  const description =
    "Fotos, vídeos, artes, propostas e materiais oficiais da campanha Juliana 1020.";

  return {
    title,
    description,
    icons: {
      icon: "/media/juliana-logo.png",
      shortcut: "/media/juliana-logo.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1536,
          height: 1024,
          alt: "Central Juliana 1020 - materiais oficiais para apoiar e compartilhar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

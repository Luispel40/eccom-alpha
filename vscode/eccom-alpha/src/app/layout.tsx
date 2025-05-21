// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Poppins } from "next/font/google";
import React from "react";
import ClientProviders from "./ClientProviders";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MY Shop",
  description: "my complete shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} max-w-[1024px] mx-auto flex flex-col p-4`}>
        <ClientProviders>
          <Header /> {/* Header dentro do SessionProvider agora */}
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

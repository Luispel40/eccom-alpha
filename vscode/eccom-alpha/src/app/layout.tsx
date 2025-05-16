import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "MY Shop",
  description: "my complete shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<html lang="pt-BR">
    <body className={`${poppins.className} max-w-[1024px] mx-auto flex flex-col p-4`}
    >
      <Header />
      {children}
    </body>
  </html>
  );
}

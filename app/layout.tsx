import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin MathVenture",
  description: "MathVenture Admin Dashboard & Kelola Materi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} h-full`}>
      <body className="antialiased min-h-screen">
        <Navbar />
        <main className="main-container">{children}</main>
      </body>
    </html>
  );
}

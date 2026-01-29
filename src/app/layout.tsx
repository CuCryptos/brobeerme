import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BroBeerMe — Discover Craft Beer",
  description:
    "The ultimate platform for craft beer enthusiasts. Rate brews, discover breweries, and connect with fellow beer lovers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}

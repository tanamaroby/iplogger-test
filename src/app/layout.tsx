import dotenv from "dotenv";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".vercel/.env.production"
    : ".vercel/.env.local";

dotenv.config({ path: envFile });

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Site",
  description: "Please do not take this site seriously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Layout from "@/layout/root";
import { NProgress } from "@/components/n-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turing Test",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        <NProgress />
      </body>
    </html>
  );
}

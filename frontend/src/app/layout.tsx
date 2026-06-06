import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Authentication - VendorBridge",
  description: "Secure login and registration dashboard for VendorBridge Odoo integration.",
  authors: [{ name: "VendorBridge Team" }],
};

import { Sidebar } from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="font-sans antialiased h-full bg-slate-50 text-slate-900">
        <Sidebar />
        <main className="pl-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

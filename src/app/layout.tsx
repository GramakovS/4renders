import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navigation from "@/components/Navigation";
import QueryProvider from "@/components/QueryProvider";
import { ReactQueryDevtoolsClient } from "@/components/ReactQueryDevtoolsClient";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4renders App",
  description: "Comprehensive Next.js application showcasing different rendering methods, API integration, and modern features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 min-h-screen`}
      >
        <QueryProvider>
          <div className="flex">
            <Navigation />
            <main className="flex-1 lg:ml-64 min-h-screen">
              <div className="lg:hidden h-16" />
              {children}
            </main>
          </div>
          <ReactQueryDevtoolsClient />
        </QueryProvider>
      </body>
    </html>
  );
}

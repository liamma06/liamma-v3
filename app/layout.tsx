import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "liamma",
  description: "liamma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full antialiased`}>
      <body className="min-h-full font-[var(--font-geist-sans)]">
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

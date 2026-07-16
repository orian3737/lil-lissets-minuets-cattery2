import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Lil Lisset's Minuets Cattery",
  description:
    "TICA registered Minuet kittens raised with love in Litchfield County, Connecticut.",
  metadataBase: new URL("https://www.lillissetsminuetscattery.com"),
  openGraph: {
    title: "Lil Lisset's Minuets Cattery",
    description:
      "Family-raised Minuet kittens, rotating availability, cattery education, and owner-managed kitten updates.",
    images: ["/wix/homepage.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

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
  title: {
    default: "Lil Lisset's Minuets Cattery",
    template: "%s | Lil Lisset's Minuets",
  },
  description:
    "TICA registered Minuet kittens raised with love in New Hartford and Litchfield County, Connecticut.",
  metadataBase: new URL("https://www.lillissetsminuetscattery.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lil Lisset's Minuets Cattery",
    description:
      "Family-raised Minuet kittens, happy homes, cattery education, and owner-managed kitten updates.",
    url: "https://www.lillissetsminuetscattery.com/",
    siteName: "Lil Lisset's Minuets",
    images: ["/assets/wix/homepage-pic.webp"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Lisset's Minuets Cattery",
    description:
      "TICA registered family cattery raising Minuet kittens in Connecticut.",
    images: ["/assets/wix/homepage-pic.webp"],
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

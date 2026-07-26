import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://erickandmutua.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Erick & Mutua | Buy & Sell Quality Used Cars in Kenya",
    template: "%s | Erick & Mutua Cars",
  },
  description:
    "Kenya's premier used car dealership. Browse certified pre-owned vehicles with transparent pricing, 150-point inspections, and expert consultancy. Find your dream car today.",
  keywords: [
    "used cars Kenya",
    "buy cars Nairobi",
    "sell cars Kenya",
    "pre-owned vehicles",
    "Erick and Mutua",
    "car dealership Kenya",
    "SUV Kenya",
    "sedan Kenya",
    "luxury cars Nairobi",
    "certified used cars",
    "affordable cars Kenya",
    "car seller",
    "second hand cars",
  ],
  authors: [{ name: "Erick & Mutua" }],
  creator: "Erick & Mutua",
  publisher: "Erick & Mutua",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Erick & Mutua Cars",
    title: "Erick & Mutua | Buy & Sell Quality Used Cars in Kenya",
    description:
      "Kenya's premier used car dealership. Browse certified pre-owned vehicles with transparent pricing and expert consultancy.",
    images: [
      {
        url: "/hero-car.png",
        width: 1200,
        height: 630,
        alt: "Erick & Mutua - Premium Used Cars in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick & Mutua | Buy & Sell Quality Used Cars in Kenya",
    description:
      "Kenya's premier used car dealership. Certified pre-owned vehicles with transparent pricing.",
    images: ["/hero-car.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

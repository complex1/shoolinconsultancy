import type { Metadata } from "next";
import { Inter, Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "@/styles/fonts.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { SeoHead } from "./components/SeoHead";
import CookieConsent from "./components/CookieConsent";
import LegalNetwork from "./components/ui/LegalNetwork";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shoolinconsultancy.com'),
  title: "Shoolin Legal Consultancy | Professional Legal Services",
  description:
    "Expert legal consultancy services for businesses and individuals. Specializing in corporate law, compliance, and strategic legal advisory.",
  keywords:
    "legal consultancy, corporate law, business law, legal advisory, India law firm, corporate compliance, legal services",
  openGraph: {
    type: 'website',
    title: 'Shoolin Legal Consultancy | Professional Legal Services',
    description: 'Expert legal consultancy services for businesses and individuals. Specializing in corporate law, compliance, and strategic legal advisory.',
    url: 'https://shoolinconsultancy.com',
    siteName: 'Shoolin Legal Consultancy',
    images: [
      {
        url: '/logo.svg',
        width: 800,
        height: 600,
        alt: 'Shoolin Legal Consultancy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shoolin Legal Consultancy | Professional Legal Services',
    description: 'Expert legal consultancy services for businesses and individuals.',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://shoolinconsultancy.com',
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
      className={`${poppins.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        <SeoHead page="/" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <LegalNetwork />
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

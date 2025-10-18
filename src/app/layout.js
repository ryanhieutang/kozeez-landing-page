import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import LenisProvider from "./components/LenisProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kozeez - Short-term Rental Accomodations",
  description: "Designed with comfort, luxury and YOU in mind",
  keywords:
    "Kozeez, vacation rentals, holiday stays, travel, Airbnb alternative, short-term rentals, hotel booking, accommodation, airbnb, suite, sydney",
  author: "Kozeez Team",
  applicationName: "Kozeez",
  generator: "Next.js",
  robots: "index, follow",
  openGraph: {
    title: "Kozeez - Designed with comfort, luxury and YOU in mind",
    description: "Stays are easy with Kozeez",
    url: "https://kozeez.com",
    siteName: "Kozeez",
    images: [
      {
        url: "https://kozeez.com/images/kozeez-image.png",
        width: 1600,
        height: 840,
        alt: "Kozeez – Effortless Stays",
      },
    ],
    type: "website",
    locale: "en_AU",
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const themeColor = "#A78949";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
          <main>
            <LenisProvider>{children}</LenisProvider>
          </main>
        </body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kozeez",
            url: "https://kozeez.com",
            logo: "https://kozeez.com/icons/apple-touch-icon.png",
          }),
        }}
      />
    </html>
  );
}

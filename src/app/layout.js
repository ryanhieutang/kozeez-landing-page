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

export const metadata = {
  title: "Kozeez - Designed with comfort, luxury and YOU in mind",
  description: "Stays are easy with Kozeez",
  keywords: "Kozeez, vacation rentals, holiday stays, travel, Airbnb alternative, short-term rentals, hotel booking, accommodation, airbnb, suite, sydney",
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
        url: "https://kozeez.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kozeez – Effortless Stays",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/icons/favicon.ico", // ✅ Correct
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const themeColor = "#A78949"; // ✅ Corrected

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

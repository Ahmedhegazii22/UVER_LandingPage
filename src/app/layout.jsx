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
  title: "UVER – Explore & Apply to Universities Easily",
  description:
    "UVER is a modern platform that helps future students explore universities, compare academic programs, and apply with ease and at the right time.",
  keywords: [
    "UVER",
    "universities",
    "university finder",
    "study abroad",
    "apply to universities",
    "compare programs",
    "higher education",
  ],
  openGraph: {
    title: "UVER – Explore & Apply to Universities Easily",
    description:
      "Discover universities, compare programs, and apply effortlessly using UVER.",
    url: "https://uver-landing-page-smoky.vercel.app/",
    siteName: "UVER",

    type: "website",
  },
};

export default function RootLayout({ children }) {
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

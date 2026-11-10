import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/main_components/Navbar";
import ScrollProgress from "./components/main_components/ScrollProgress";
import { Toaster } from "react-hot-toast";
import { PROFILE } from "@/data/profile";
import { MotionConfig } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${PROFILE.fullName} • Birthday Celebration & Portfolio`,
  description: `${PROFILE.tagline} Celebrate ${PROFILE.birthDate.dayMonth} with ${PROFILE.fullName} — ${PROFILE.role} from ${PROFILE.location}.`,
  keywords: [
    PROFILE.fullName,
    "Birthday Countdown",
    "Next.js Developer",
    "Full-Stack Developer",
    "Karachi",
  ],
  openGraph: {
    title: `${PROFILE.fullName} • Birthday Celebration`,
    description: PROFILE.tagline,
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#050816] text-white antialiased">
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <Navbar />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0B1020",
                color: "#F8FAFC",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                borderRadius: "14px",
              },
            }}
          />
        </MotionConfig>
      </body>
    </html>
  );
}

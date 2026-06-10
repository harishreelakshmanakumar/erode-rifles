import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Erode Rifles — Premium Air Rifles & Shooting Sports",
  description: "Your premier destination for premium air rifles, air pistols, pellets, and shooting accessories in Erode, Tamil Nadu. Professional training programs available.",
  keywords: ["Erode Rifles", "air rifles", "shooting sports", "air pistols", "pellets", "Tamil Nadu", "shooting training"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bebasNeue.variable} antialiased bg-white text-erode-black`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

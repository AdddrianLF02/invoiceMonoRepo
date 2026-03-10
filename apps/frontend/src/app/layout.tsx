import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Quicksand } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quickSand = Quicksand({
  variable: "--font-quick-sand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoiceFlow",
  description: "Sistema operativo para tu flujo de caja.",
};

import Providers from "./providers";
import { Toaster } from "./components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${quickSand.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}

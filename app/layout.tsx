import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { GlobalProvider } from "./contexts/global";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JEM - Midia",
  description: "JEM Web solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <GlobalProvider>{children}</GlobalProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            //unstyled: true,
            classNames: {
              toast: "bg-gray-800 border-gray-600",
              warning: "text-yellow-400",
              title: "text-white",
            },
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "AIR G INTERNATIONAL | Premium Innovation Hub",
  description: "Architecting the future of learning with high-precision industrial-grade education ecosystems.",
};

import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/auth-context";
import { LanguageProvider } from "@/context/language-context";
import Notifications from "@/components/Notifications";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} font-body bg-black text-white antialiased`} suppressHydrationWarning>
        <AppProvider>
          <AuthProvider>
            <LanguageProvider>
              <Notifications />
              {children}
            </LanguageProvider>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}







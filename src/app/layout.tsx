import type { Metadata } from "next";
import { Prompt, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {SpeedInsights} from "@vercel/speed-insights/next";
import React from "react";
import {ThemeProvider} from "@/components/themeProvider";

const font = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
    metadataBase: new URL("https://mkko120.pl"),
    title: {
      template: "%s | mkko120",
      default: "mkko120"
    },
    description: "hello! i'm mkko120 and this is my personal website, check it out!",
    openGraph: {
        title: "mkko120 | portfolio",
        description: "hello! i'm mkko120 and this is my personal website, check it out!",
        type: "website",
        url: "https://mkko120.pl",
        images: "https://mkko120.pl/me.png"
    },
    twitter: {
        title: "mkko120 | portfolio",
        description: "hello! i'm mkko120 and this is my personal website, check it out!",
        card: "summary_large_image",
        site: "https://mkko120.pl",
        images: "https://mkko120.pl/me.png"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
      <main className={"min-w-dvw min-h-dvh w-full h-full bg-black text-white relative"}>
          <ThemeProvider attribute={"class"} defaultTheme={"dark"}>
              <Navbar />
              {children}
              <Footer />
          </ThemeProvider>
      </main>
      <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Prompt, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {SpeedInsights} from "@vercel/speed-insights/next";

const font = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
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
      <main className={"w-dvw h-dvh bg-black text-white"}>
          <Navbar />
          {children}
          <Footer />
      </main>
      <SpeedInsights />
      </body>
    </html>
  );
}

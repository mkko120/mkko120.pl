import type { Metadata } from "next";
import { Prompt, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
      </body>
    </html>
  );
}

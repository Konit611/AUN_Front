import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Maru_Gothic } from "next/font/google";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import BottomNavBar from "@/app/components/layout/bottom-nav-bar";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AUN — あなたにぴったりの日本酒ペアリング",
  description:
    "日常を彩る、洗練された一献の提案。あなたにぴったりの日本酒ペアリングを見つけましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${shipporiMincho.variable} ${zenMaruGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNavBar />
      </body>
    </html>
  );
}

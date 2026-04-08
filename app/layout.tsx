import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import BottomNavBar from "@/app/components/layout/bottom-nav-bar";
import "./globals.css";

const zenKakuGothicNew = localFont({
  variable: "--font-zen-kaku-gothic-new",
  src: [
    { path: "./fonts/ZenKakuGothicNew-Light.ttf", weight: "300" },
    { path: "./fonts/ZenKakuGothicNew-Regular.ttf", weight: "400" },
    { path: "./fonts/ZenKakuGothicNew-Medium.ttf", weight: "500" },
    { path: "./fonts/ZenKakuGothicNew-Bold.ttf", weight: "700" },
  ],
});

const zenMaruGothic = localFont({
  variable: "--font-zen-maru-gothic",
  src: [
    { path: "./fonts/ZenMaruGothic-Light.ttf", weight: "300" },
    { path: "./fonts/ZenMaruGothic-Regular.ttf", weight: "400" },
    { path: "./fonts/ZenMaruGothic-Medium.ttf", weight: "500" },
    { path: "./fonts/ZenMaruGothic-Bold.ttf", weight: "700" },
  ],
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
      className={`${zenKakuGothicNew.variable} ${zenMaruGothic.variable} h-full antialiased`}
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

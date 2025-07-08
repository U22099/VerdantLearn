import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "700"],
});


export const metadata: Metadata = {
  title: "VerdantLearn",
  description: "A simple flashcard app to help you study.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "h-full font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

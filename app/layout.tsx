import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakshmanan | Full Stack Developer",
  description: "Full Stack Developer building web and IoT applications with React, Next.js, Node.js, PostgreSQL, AWS and DevOps technologies.",
  openGraph: {
    title: "Lakshmanan | Full Stack Developer",
    description: "Building real-world web and IoT applications from code to production.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}

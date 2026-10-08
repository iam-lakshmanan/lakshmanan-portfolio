import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakshmanan A | Full Stack Developer, AWS & DevOps",
  description: "Full Stack Developer building production web, e-commerce, IoT, and location-based applications with React, Next.js, Node.js, PostgreSQL, AWS, DigitalOcean, Docker, and DevOps technologies.",
  openGraph: {
    title: "Lakshmanan A | Full Stack Developer, AWS & DevOps",
    description: "Production-focused full-stack engineering across web, IoT, cloud deployment, and DevOps.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}

import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Omsky TV - Free IPTV Streaming",
  description: "Stream thousands of live TV channels from Asia and around the world for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-screen bg-[#121212]">
            <Sidebar />
            <main className="flex-1 lg:ml-[280px]">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

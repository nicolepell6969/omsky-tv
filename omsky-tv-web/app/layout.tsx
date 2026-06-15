import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omsky TV - Free IPTV Streaming",
  description: "Watch thousands of free TV channels from around the world. Stream live TV, news, sports, movies, and more with Omsky TV.",
  keywords: ["IPTV", "free TV", "live streaming", "online TV", "world channels"],
  openGraph: {
    title: "Omsky TV - Free IPTV Streaming",
    description: "Watch thousands of free TV channels from around the world",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 mt-12">
              <div className="container px-4 text-center text-sm text-muted-foreground">
                <p>
                  © {new Date().getFullYear()} Omsky TV. Powered by{" "}
                  <a
                    href="https://github.com/iptv-org/iptv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    iptv-org
                  </a>
                </p>
                <p className="mt-2 text-xs">
                  All content is provided by third-party sources. We do not host any streams.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

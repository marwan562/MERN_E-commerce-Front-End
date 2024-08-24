import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/E-commerce/Navbar";
import StoreProvider from "@/providers/StoreProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import InternetConnecationProvider from "@/providers/InternetConnectionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce UI",
  description: "Black Ecommerce",
  icons: "/svg/corsen-main-logo-svg.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <InternetConnecationProvider>
              <NextTopLoader />
              <div className="flex flex-col">
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
              <Toaster />
            </InternetConnecationProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

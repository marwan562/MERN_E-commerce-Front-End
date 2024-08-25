// RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/E-commerce/Navbar";
import StoreProvider from "@/providers/StoreProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "sonner";
import InternetConnecationProvider from "@/providers/InternetConnectionProvider";
import NextTopLoading from "@/components/NextTopLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce UI",
  description: "Black Ecommerce",
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
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <StoreProvider>
            <InternetConnecationProvider>
              <NextTopLoading />
              {/* App */}
              <div className="flex-1">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>

              <Toaster />
              <ToasterSonner position="top-center" />
            </InternetConnecationProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

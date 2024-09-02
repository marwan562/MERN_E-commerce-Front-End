import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/providers/StoreProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "sonner";
import InternetConnecationProvider from "@/providers/InternetConnectionProvider";
import NextTopLoading from "@/components/NextTopLoading";
import RedirectRoleProvider from "@/providers/RedirectRoleProvider";

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
              <RedirectRoleProvider>{children}</RedirectRoleProvider>
              <Toaster />
              <ToasterSonner position="top-center" />
            </InternetConnecationProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

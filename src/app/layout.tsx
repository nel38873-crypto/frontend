import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyBookingBar from "@/components/layout/MobileStickyBookingBar";
import { AuthProvider } from "@/context/AuthContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Grihum Farms | Luxury Eco Stay & Water Spring Retreat in Udaipur",
  description: "Escape to Grihum Farms, an exclusive private farmhouse villa nestled amidst nature in Udaipur, India. Experience natural water spring views, organic Rajasthani thali dining, private pool, and peaceful mountain serenity.",
  keywords: ["Grihum Farms", "Udaipur Farmstay", "Luxury Farmhouse Udaipur", "Eco Stay Water Spring", "Private Villa Udaipur"],
  openGraph: {
    title: "Grihum Farms | Luxury Eco Stay & Water Spring Retreat",
    description: "Official website of Grihum Farms — exclusive single farmhouse escape in Udaipur, Rajasthan.",
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-cream text-forest font-sans antialiased min-h-screen flex flex-col selection:bg-olive selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <MobileStickyBookingBar />
        </AuthProvider>
      </body>
    </html>
  );
}

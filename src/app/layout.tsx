import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nuevincent.com"),
  title: {
    default: "NUEVINCENT | Creative Video Production & Advertising Studio",
    template: "%s | NUEVINCENT",
  },
  description:
    "NUEVINCENT is a creative video production and advertising studio creating films, brand campaigns, commercials, product videos, visual content and post-production experiences.",
  keywords: [
    "NUEVINCENT",
    "Film Production Hyderabad",
    "Creative Video Production",
    "Advertising Agency",
    "Commercial Film Makers",
    "Post-Production Studio",
    "Color Grading DaVinci Resolve",
    "Brand Films",
    "Product Videos",
    "Music Video Director",
    "Motion Graphics",
  ],
  authors: [{ name: "NUEVINCENT Creative Studio" }],
  creator: "NUEVINCENT",
  publisher: "NUEVINCENT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "NUEVINCENT | Creative Video Production & Advertising Studio",
    description:
      "We turn ideas, stories, brands and concepts into experiences and visuals that make an impact.",
    url: "https://nuevincent.com",
    siteName: "NUEVINCENT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "NUEVINCENT Creative Video Production Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NUEVINCENT | Creative Video Production & Advertising Studio",
    description:
      "We turn ideas, stories, brands and concepts into experiences and visuals that make an impact.",
    images: ["https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"],
    creator: "@nuevincent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-cinema-950 text-foreground selection:bg-brand-purple selection:text-white flex flex-col min-h-screen font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

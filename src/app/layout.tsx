import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PROPER & Kehati | PT PLN Indonesia Power UBP Cilegon",
  description: "Portal resmi pelestarian Keanekaragaman Hayati (Kehati) dan pemantauan kinerja pengelolaan lingkungan PROPER PT PLN Indonesia Power UBP Cilegon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${playfair.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
      </body>
    </html>
  );
}

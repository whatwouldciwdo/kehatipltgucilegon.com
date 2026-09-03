import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
    <html lang="id" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}


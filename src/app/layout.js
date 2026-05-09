import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata = {
  title: "Masjid Nurul Hayat",
  description: "Tempat Sucikan Jiwa, Perkuat Ukhuwah - Masjid Nurul Hayat di Surabaya, Jawa Timur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

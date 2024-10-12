import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const josefin_sans = Josefin_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-josefin antialiased container mx-auto ${josefin_sans.className}`}
      >
        {children}
      </body>
    </html>
  );
}

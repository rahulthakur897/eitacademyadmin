import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ReduxProvider from "./redux/ReduxProvider";  
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EIT Academy Portal",
  description: "EIT Academy portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className="font-cabinet antialiased">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

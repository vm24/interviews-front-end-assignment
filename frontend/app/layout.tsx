import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import MusicPlayer from "./components/MusicPlayer";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast'

const inter = Raleway({
  subsets: ['latin'],   // Subset to load
  weight: ['100', '300', '400', '700'] // Example weights: 400 for regular, 700 for bold
});

export const metadata: Metadata = {
  title: "RecipeBook",
  description: "Discover Recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader 
        color="linear-gradient(to right, #9D7FEA, #7C3AED);"
        speed={500}
        />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        <MusicPlayer src="/assets/mariage-damour.mp3" />
      </body>
    </html>
  );
}

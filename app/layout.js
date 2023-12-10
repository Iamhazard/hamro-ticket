import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/NavBar";
import { Providers } from "@/Redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hamro ticket",
  description: "Ticket Booking system using Next js",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
        </head>
        <body className={inter.className}>
          <NavBar />
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery Delivery",
  description: "We deliver groceries, lol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sf-pro-display flex justify-center bg-gray-100">{children}</body>
    </html>
  );
}

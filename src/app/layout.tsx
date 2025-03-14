import type { Metadata } from "next";
import "./globals.css";
import { ProductProvider } from "@/context/productContext";
import { CategoryProvider } from "@/context/categoryContext";
import { CartProvider } from "@/context/cartContext";

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
      <ProductProvider>
        <CategoryProvider>
          <CartProvider>
            <body className="font-sf-pro-display flex justify-center bg-gray-100">
              {children}
            </body>
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </html>
  );
}

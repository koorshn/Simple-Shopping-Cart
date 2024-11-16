import type { Metadata } from "next";
import "../styles/globals.css";
import { ProductProvider } from "@/context/product/ProductProvider";
import { CartProvider } from "@/context/product/CartProvider";
import { YekanFont } from "@/styles/font";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "shopping cart",
  description: "simple shopping cart project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProductProvider>
        <CartProvider>
          
          <body  className={`w-full h-dvh  ${YekanFont.className}`}>
            {children}
          </body>
        </CartProvider>
      </ProductProvider>
    </html>
  );
}

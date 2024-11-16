import React from "react";
import Footer from "./Footer";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import CartContainer from "../cart/CartWidget";
import CartWidget from "../cart/CartWidget";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">سبد خرید</h1>
        <CartWidget />
        
      </nav>
    </header>
  );
}

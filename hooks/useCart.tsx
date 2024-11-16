"use client";

import  { CartContext, UseCartContextType } from "@/context/product/CartProvider";
import { useContext } from "react";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;

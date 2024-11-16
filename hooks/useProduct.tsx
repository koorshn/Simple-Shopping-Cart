"use client";

import ProductContext, {
  UseProductsContextType,
} from "@/context/product/ProductProvider";
import { useContext } from "react";

const useProducts = (): UseProductsContextType => {
  return useContext(ProductContext);
};

export default useProducts;

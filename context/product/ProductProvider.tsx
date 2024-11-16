"use client";

import { createContext, ReactElement, useState, useEffect } from "react";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const initialState: ProductType[] = [];

// [
//   {
//     id: "0001",
//     title: "ساعت مچی",
//     price: 120000,
//   },
//   {
//     id: "0002",
//     title: " ساعت دیواری",
//     price: 130000,
//   },
//   {
//     id: "0003",
//     title: "ساعت جیبی",
//     price: 140000,
//   },
// ];

export type UseProductsContextType = { products: ProductType[] };

const initialContextState: UseProductsContextType = { products: [] };

const ProductContext =
  createContext<UseProductsContextType>(initialContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("https://fakestoreapi.com/products")
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
// export default ProductProvider;

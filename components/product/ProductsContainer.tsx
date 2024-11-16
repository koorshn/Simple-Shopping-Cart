"use client";

import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProduct";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { gsap } from "gsap";
import Modal from "../ui/modals/Modal";

export default function ProductContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { totalItem, totalPrice } = useCart();
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    gsap.from(".product-card", {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: "power1.out",
    });
  }, []);
  // const [inCart, setInCart] = useState<boolean>(false);
  //   import Product

  //   if (products?.length) {
  //     products.map((product) => {
  //       setInCart(cart.some((item) => item.id === product.id));
  //     });
  //   }

  //   the amounts
  //   {totalItem}
  //   {totalPrice}

  console.log(products);
  return (
    <>
      <main className="p-4">
        <h1 className="text-2xl text-gray-800 font-bold text-center mb-6">
          به دکان خوش امدید
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.length &&
            products.map((product) => {
              let inCart = cart.some((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  dispatch={dispatch}
                  REDUCER_ACTIONS={REDUCER_ACTIONS}
                  inCart={inCart}
                />
              );
            })}
        </div>
      </main>
    </>
    // <div className="flex justify-between">
    //   <>
    //     {products?.length &&
    //       products.map((product) => {
    //         let inCart = cart.some((item) => item.id === product.id);
    //         return (
    //           <ProductCard
    //             key={product.id}
    //             product={product}
    //             dispatch={dispatch}
    //             REDUCER_ACTIONS={REDUCER_ACTIONS}
    //             inCart={inCart}
    //           />
    //         );
    //       })}
    //   </>
    // </div>
  );
}

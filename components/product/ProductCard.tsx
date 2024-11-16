"use client";

import { ProductType } from "@/context/product/ProductProvider";
import React, { ReactElement, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import {
  ReducerAction,
  ReducerActionType,
} from "@/context/product/CartProvider";
import gsap from "gsap";

type propstype = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

export default function ProductCard({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: propstype): ReactElement {
  const cardRef = useRef<HTMLDivElement | null>(null);

  console.log(inCart);
  // add to cart
  const addToCartHandle = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quanity: 1 },
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.out",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      rotationX: 0, // Reset rotation on leave
      rotationY: 0,
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (cardRef.current) {
      const { clientX, clientY } = event;
      const { left, top, width, height } =
        cardRef.current.getBoundingClientRect();

      // Calculate center of card
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate mouse position relative to the center of the card
      const deltaX = (clientX - centerX) / (width / 2);
      const deltaY = (clientY - centerY) / (height / 2);

      // Apply rotation based on mouse position
      gsap.to(cardRef.current, {
        rotationY: deltaX * 10, // Tilt angle
        rotationX: -deltaY * 10, // Tilt angle
        duration: 0.1,
        ease: "power1.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="max-w-sm rounded-lg flex flex-col justify-between overflow-hidden cursor-pointer bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(event) => handleMouseMove(event)} // Detect mouse movement
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
      {inCart ? (
        <button className="bg-green-500 text-center flex justify-center items-center text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          <Check />
        </button>
      ) : (
        <button
          onClick={() => addToCartHandle()} // Function to handle adding to cart
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

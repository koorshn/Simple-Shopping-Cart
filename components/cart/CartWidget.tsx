"use client";

import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import Modal from "../ui/modals/Modal";
import Cart from "./Cart";
import useCart from "@/hooks/useCart";

export default function CartWidget() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="h-full flex p-1  relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="size-7" />
        {cart.length > 0 && (
          <div className="w-4 h-4 text-sm text-gray-200 bg-red-600 rounded-full flex items-center justify-center absolute left-4">
            {cart.length}
          </div>
        )}
      </div>

      {isOpen && (
        <Modal setIsOpen={setIsOpen} title="سبد خرید">
          <Cart />
        </Modal>
      )}
    </>
  );
}

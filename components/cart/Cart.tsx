import useCart from "@/hooks/useCart";
import React, { useState } from "react";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [confirm, serConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItem, totalPrice, cart } = useCart();

  function submitHandler() {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    router.push("/dashboard/submit");
  }

  return (
    <>
      {cart.length ? (
        <div className="flex flex-col w-full ">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          ))}
          <div className="flex flex-col border-t-2 p-2 gap-4">
            <div className="flex text-lg w-1/2 p-2 justify-between text-black gap-4">
              <p>total Price: ${totalPrice.toFixed(2)}</p>
              <p>totalItem: {totalItem}</p>
            </div>
            <button
              onClick={() => submitHandler()}
              className="bg-green-500 text-white px-4 py-2 w-32 rounded-lg font-semibold hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              aria-label="Add to cart"
            >
              submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            It looks like you haven't added anything to your cart yet.
          </p>
        </div>
      )}
    </>
  );
}

import {
  CartItemType,
  ReducerAction,
  ReducerActionType,
} from "@/context/product/CartProvider";
import React, { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

export default function CartItem({
  item,
  dispatch,
  REDUCER_ACTIONS,
}: PropsType) {
  const lineTotal: number = item.quanity * item.price;

  function changeQtyHandle(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quanity: Number(e.target.value) },
    });
  }

  // remove an item from cart
  function removeHandle() {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  }

  return (
    <div className="flex  items-center p-4 border-b border-gray-300">
    
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
        <p className="text-gray-800 font-bold">${lineTotal.toFixed(2)}</p>
        <input
          onChange={(e) => changeQtyHandle(e)}
          className="h-10 w-12 bg-gray-200 px-1 text-gray-800 rounded-2xl"
          type="number"
          defaultValue={item?.quanity}
        />
        
      </div>
      <button
        className="text-red-600 hover:text-red-800 transition duration-200"
        aria-label="Remove item from cart"
        onClick={removeHandle}
      >
        <Trash2 />
      </button>
    </div>
  );
}

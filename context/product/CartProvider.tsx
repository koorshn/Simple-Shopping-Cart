"use client";

import { useMemo, useReducer, createContext, ReactElement } from "react";

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  quanity: number;
};

type CartStateType = { cart: CartItemType[] };

const initialCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

// Utility functions to manage local storage
const saveCartToLocalStorage = (cart: CartItemType[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = (): CartItemType[] => {
  if (typeof window === "undefined") {
    // We're in a server-side or non-browser environment
    return [];
  }

  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};


const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  let updatedCart;

  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("در عملیات اضافه کردن پیلود وارد نشده است");
      }
      const { id, title, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );
      const quanity: number = itemExists ? itemExists.quanity + 1 : 1;
      updatedCart = [...filteredCart, { id, title, price, quanity }];
      saveCartToLocalStorage(updatedCart); // Save to local storage
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("در عملیات حذف کردن پیلود وارد نشده است");
      }
      const { id } = action.payload;
      updatedCart = state.cart.filter((item) => item.id !== id);
      saveCartToLocalStorage(updatedCart); // Save to local storage
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("در عملیات مجموع سبد پیلود وارد نشده است");
      }
      const { id, quanity } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error("کالا وجود ندارد");
      }

      const updatedItem: CartItemType = { ...itemExists, quanity };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      updatedCart = [...filteredCart, updatedItem];
      saveCartToLocalStorage(updatedCart); // Save to local storage
      return { ...state, cart: updatedCart };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      saveCartToLocalStorage([]); // Clear local storage on submit
      return { ...state, cart: [] };
    }
    default:
      throw new Error("خطای در پیدا کردن reducer action");
  }
};

const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialCartState,
    cart: getCartFromLocalStorage(), // Initialize cart from local storage
  });

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItem = state.cart.reduce((prev, cartItem) => {
    return prev + cartItem.quanity;
  }, 0);

  const totalPrice = state.cart.reduce((prev, cartItem) => {
    return prev + cartItem.quanity * cartItem.price;
  }, 0);

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.id);
    const itemB = Number(b.id);
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItem, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initialCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItem: 0,
  totalPrice: 0,
  cart: [],
};

export const CartContext = createContext<UseCartContextType>(
  initialCartContextState
);

type ChildrenType = { children?: React.ReactElement | React.ReactElement[] };

export const CartProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartContextState)}>
      {children}
    </CartContext.Provider>
  );
};

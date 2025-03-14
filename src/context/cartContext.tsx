"use client";

import { getCart } from "@/services/cartService";
import { ProductCartMap } from "@/types/cart";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  cart: ProductCartMap[] | undefined;
  setCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("Context usage out of provider");
  }
  return ctx;
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductCartMap[] | undefined>();

  const updateCart = async (): Promise<void> => {
    const cartItems = await getCart();
    setCart(cartItems);
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

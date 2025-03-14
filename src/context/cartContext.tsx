"use client";

import { getCart, addToCart, updateCartItem, removeFromCart } from "@/services/cartService";
import { ProductCartMap, CartItem } from "@/types/cart";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  cart: ProductCartMap | undefined;
  addToCart: (data: CartItem) => Promise<void>;
  updateCartItem: (productId: number, updatedData: Partial<CartItem>) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
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
  const [cart, setCart] = useState<ProductCartMap | undefined>();

  const updateCart = async (): Promise<void> => {
    const cartItems = await getCart();
    setCart(cartItems);
  };

  useEffect(() => {
    updateCart();
  }, []);

  const handleAddToCart = async (data: CartItem) => {
    await addToCart(data);
    updateCart(); 
  };
  
  const handleUpdateCartItem = async (productId: number, updatedData: Partial<CartItem>) => {
    await updateCartItem(productId, updatedData);
    updateCart(); 
  };

  const handleRemoveFromCart = async (productId: number) => {
    await removeFromCart(productId);
    updateCart(); 
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: handleAddToCart,
        updateCartItem: handleUpdateCartItem,
        removeFromCart: handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

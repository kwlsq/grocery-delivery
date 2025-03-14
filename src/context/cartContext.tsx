"use client";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "@/services/cartService";
import { ProductCartMap, CartItem } from "@/types/cart";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProductContext } from "./productContext";
import { Product } from "@/types/product";

interface CartContextType {
  cart: ProductCartMap | undefined;
  cartItems: Product[] | undefined;
  addToCart: (data: CartItem) => Promise<void>;
  updateCartItem: (
    productId: number,
    updatedData: Partial<CartItem>
  ) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  getCartItemsFromCartId: () => void;
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
  const { productList } = useProductContext();
  const [cart, setCart] = useState<ProductCartMap | undefined>();
  const [cartItems, setCartItems] = useState<Product[] | undefined>();

  const updateCart = async (): Promise<void> => {
    const cartItems = await getCart();
    setCart(cartItems);
  };

  const handleAddToCart = async (data: CartItem) => {
    await addToCart(data);
    updateCart();
  };

  const handleUpdateCartItem = async (
    productId: number,
    updatedData: Partial<CartItem>
  ) => {
    await updateCartItem(productId, updatedData);
    updateCart();
  };

  const handleRemoveFromCart = async (productId: number) => {
    await removeFromCart(productId);
    updateCart();
  };

  const getCartItemsFromCartId = () => {
    const productMap = new Map(productList?.map((p) => [p.id, p]));
    const cartItems = Object.values(cart ?? {})
      .map((item) => productMap.get(item.id))
      .filter((product): product is Product => product !== undefined);

    setCartItems(cartItems);
  };

  useEffect(() => {
    updateCart();
  }, []);

  useEffect(() => {
    if (productList && cart) {
      getCartItemsFromCartId();
    }
  }, [productList, cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        addToCart: handleAddToCart,
        updateCartItem: handleUpdateCartItem,
        removeFromCart: handleRemoveFromCart,
        getCartItemsFromCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

"use client"

import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProductContextType {
  productList: Product[] | undefined;
  setProductList: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("Context usage out of provider");
  }
  return ctx;
};

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [productList, setProductList] = useState<Product[] | undefined>();

  const updateProductList = async (): Promise<void> => {
    setProductList(await getProducts());
  };

  useEffect(() => {
    updateProductList();
  }, []);

  return (
    <ProductContext.Provider
      value={{ productList, setProductList: updateProductList }}
    >
      {children}
    </ProductContext.Provider>
  );
};

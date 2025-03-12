"use client";

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
  categoryList: string[] | undefined;
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
  const [categoryList, setCategoryList] = useState<string[] | undefined>();

  const updateProductList = async (): Promise<void> => {
    const products = await getProducts();
    setProductList(products);

    // Extract unique categories from the product list
    const uniqueCategories = Array.from(
      new Set(products.flatMap((p) => p.category))
    );
    setCategoryList(uniqueCategories);
  };

  useEffect(() => {
    updateProductList();
  }, []);

  return (
    <ProductContext.Provider
      value={{ productList, categoryList, setProductList: updateProductList }}
    >
      {children}
    </ProductContext.Provider>
  );
};

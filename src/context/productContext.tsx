"use client";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";

interface ProductContextType {
  productList: Product[] | undefined;
  categoryList: string[] | undefined;
  groupedProducts: Record<string, Product[]> | undefined;
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
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Product[]> | undefined
  >();

  const updateProductList = async (): Promise<void> => {
    const products = await getProducts();
    setProductList(products);

    // Extract and sort unique categories
    const uniqueCategories = Array.from(
      new Set(products.flatMap((p) => p.category))
    ).sort();
    setCategoryList(uniqueCategories);

    // Group products by category
    const grouped = products.reduce<Record<string, Product[]>>(
      (acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      },
      {}
    );

    setGroupedProducts(grouped);
  };

  useEffect(() => {
    updateProductList();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productList,
        categoryList,
        groupedProducts,
        setProductList: updateProductList,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

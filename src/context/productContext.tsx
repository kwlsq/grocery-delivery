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
  selectedProduct: selectedProductDataType | undefined;
  setProductList: () => Promise<void>;
  setSelectedProduct: (data: selectedProductDataType) => void;
  getNextProduct: () => void;
  getPreviousProduct: () => void;
}

interface selectedProductDataType {
  categoryIndex: number | undefined;
  productIndex: number | undefined;
  product: Product | undefined;
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
  const [selectedProduct, setSelectedProduct] =
    useState<selectedProductDataType>();

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

  const updateSelectedProduct = (data: selectedProductDataType) => {
    setSelectedProduct(data);
  };

  const getNextProduct = () => {
    if (!groupedProducts || !categoryList || !selectedProduct || !selectedProduct.product) {
      return;
    }
  
    const currentCategoryItems = groupedProducts[selectedProduct.product?.category] || [];
    const { productIndex, categoryIndex } = selectedProduct;
  
    if (productIndex === undefined || categoryIndex === undefined) {
      return;
    }
  
    if (productIndex + 1 < currentCategoryItems.length) {
      setSelectedProduct({
        categoryIndex,
        productIndex: productIndex + 1,
        product: currentCategoryItems[productIndex + 1],
      });
      return;
    }
  
    const nextCategoryIndex = categoryIndex + 1;
  
    if (nextCategoryIndex < categoryList.length) {
      const nextCategory = categoryList[nextCategoryIndex];
      const nextCategoryItems = groupedProducts[nextCategory] || [];
  
      if (nextCategoryItems.length > 0) {
        setSelectedProduct({
          categoryIndex: nextCategoryIndex,
          productIndex: 0,
          product: nextCategoryItems[0],
        });
      }
    }
  };

  const getPreviousProduct = () => {
    if (!groupedProducts || !categoryList || !selectedProduct || !selectedProduct.product) {
      return;
    }
  
    const currentCategoryItems = groupedProducts[selectedProduct.product?.category] || [];
    const { productIndex, categoryIndex } = selectedProduct;
  
    if (productIndex === undefined || categoryIndex === undefined) {
      return;
    }
  
    if (productIndex > 0) {
      setSelectedProduct({
        categoryIndex,
        productIndex: productIndex - 1,
        product: currentCategoryItems[productIndex - 1],
      });
      return;
    }
  
    const prevCategoryIndex = categoryIndex - 1;
  
    if (prevCategoryIndex >= 0) {
      const prevCategory = categoryList[prevCategoryIndex];
      const prevCategoryItems = groupedProducts[prevCategory] || [];
  
      if (prevCategoryItems.length > 0) {
        setSelectedProduct({
          categoryIndex: prevCategoryIndex,
          productIndex: prevCategoryItems.length - 1,
          product: prevCategoryItems[prevCategoryItems.length - 1],
        });
      }
    }
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
        selectedProduct,
        setProductList: updateProductList,
        setSelectedProduct: updateSelectedProduct,
        getNextProduct,
        getPreviousProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

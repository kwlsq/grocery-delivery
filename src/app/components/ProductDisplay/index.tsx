"use client";

import { useProductContext } from "@/context/productContext";
import ProductCard from "../ProductCard";

const ProductDisplay = () => {
  const { productList } = useProductContext();
  return (
    <div className="grid grid-cols-2 gap-2 p-6">
      {productList?.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </div>
  );
};

export default ProductDisplay;

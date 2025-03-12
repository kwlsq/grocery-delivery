"use client";

import { useProductContext } from "@/context/productContext";
import ProductCard from "../ProductCard";
import { useCategoryContext } from "@/context/categoryContext";

const ProductDisplay = () => {
  const { groupedProducts } = useProductContext();
  const { activeCategory } = useCategoryContext();

  if (!groupedProducts) return <p>Loading...</p>;

  const filteredProducts =
    activeCategory === "*"
      ? Object.entries(groupedProducts)
      : Object.entries(groupedProducts).filter(
          ([category]) => category === activeCategory
        );

  return (
    <div className="grid gap-4 p-6">
      {filteredProducts.map(([category, products]) => (
        <div key={category}>
          {activeCategory === "*" ? (
            <h2 className="text-lg font-bold">{category}</h2>
          ) : null}
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;

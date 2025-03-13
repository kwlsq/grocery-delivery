"use client";

import { useProductContext } from "@/context/productContext";
import ProductCard from "../ProductCard";
import { useCategoryContext } from "@/context/categoryContext";
import { Product } from "@/types/product";

const ProductDisplay = () => {
  const { groupedProducts, setSelectedProduct } = useProductContext();
  const { activeCategory } = useCategoryContext();

  if (!groupedProducts) return <p>Loading...</p>;

  const filteredProducts =
    activeCategory === "*"
      ? Object.entries(groupedProducts)
      : Object.entries(groupedProducts).filter(
          ([category]) => category === activeCategory
        );

  const handleProductClick = (
    categoryIndex: number,
    productIndex: number,
    product: Product
  ) => {
    setSelectedProduct({ categoryIndex, productIndex, product });
  };

  return (
    <div className="grid gap-4 p-6">
      {filteredProducts.map(([category, products], categoryIndex) => (
        <div key={category}>
          {activeCategory === "*" ? (
            <h2 className="text-lg font-bold">{category}</h2>
          ) : null}
          <div className="grid grid-cols-2 gap-4">
            {products.map((product, productIndex) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() =>
                  handleProductClick(categoryIndex, productIndex, product)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;

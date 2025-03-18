import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Product } from "@/types/product";
import Image from "next/image";
import { FC } from "react";
import ProductDetail from "../ProductDetail";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <div
          data-cy="product-card"
          className="bg-grey rounded-xl p-3 flex flex-col h-[242px] justify-between"
          onClick={onClick}
        >
          <div className="w-full h-[113px] flex justify-center items-center">
            <Image
              height={100}
              width={100}
              alt={`picture of product ${product.name}`}
              src={product.imageUrl}
              className="object-contain w-full max-h-28"
            />
          </div>

          <div className="text-start">
            <div className="font-semibold text-2xl">
              ${(product.price * 1000).toFixed(1)}
            </div>
            <div data-cy="product-name">{product.name}</div>
          </div>
        </div>
      </DrawerTrigger>
      <ProductDetail />
    </Drawer>
  );
};

export default ProductCard;

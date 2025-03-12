import { Product } from "@/types/product";
import Image from "next/image";
import { FC } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-grey rounded-xl p-3 flex flex-col h-[242px] justify-between">
      <div className="w-full h-[113px] flex justify-center items-center">
        <Image
          height={100}
          width={100}
          alt={`picture of product ${product.name}`}
          src={product.imageUrl}
          className="object-contain w-full max-h-28"
        />
      </div>

      <div>
        <div className="font-semibold text-2xl">${product.price*1000}</div>
        <div>{product.name}</div>
      </div>

      <div className="flex justify-between items-center">
        <div className="opacity-35">{product.weight/1000} kg</div>
        <button className="border border-[#b8b7b5] rounded-full w-10 h-10 flex justify-center items-center">
          <Image
            height={100}
            width={100}
            alt="icon add product to cart"
            src="/icons/ic-add.svg"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

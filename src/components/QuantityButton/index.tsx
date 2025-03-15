"use client";
import Image from "next/image";
import { Product } from "@/types/product";

interface QuantityButtonProps {
  cartItem: Product;
  bgColor: string;
  borderColor?: string;
  isItemExistOnCart: boolean;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  cartItem,
  bgColor,
  borderColor,
  isItemExistOnCart,
}) => {
  return isItemExistOnCart ? (
    <div className="flex items-center">
      <button
        className={`rounded-full w-10 h-10 flex justify-center items-center ${
          bgColor === "grey" ? "bg-grey" : ""
        }`}
      >
        <Image
          height={100}
          width={100}
          alt="icon substract product"
          src={
            bgColor !== "grey"
              ? "/icons/ic-substract-light.svg"
              : "/icons/ic-substract.svg"
          }
          className={`w-3 ${borderColor ? "border" : ""} border-${borderColor}`}
        />
      </button>
      <div className="flex w-20 justify-center">
        {(cartItem.weight / 1000).toFixed(1)}kg
      </div>
      <button
        className={`rounded-full w-10 h-10 flex justify-center items-center ${
          bgColor === "grey" ? "bg-grey" : ""
        }`}
      >
        <Image
          height={100}
          width={100}
          alt="icon add product"
          src={
            bgColor !== "grey" ? "/icons/ic-add-light.svg" : "/icons/ic-add.svg"
          }
          className={`w-6 ${borderColor ? "border" : ""} border-${borderColor}`}
        />
      </button>
    </div>
  ) : (
    <div>not yet</div>
  );
};

export default QuantityButton;

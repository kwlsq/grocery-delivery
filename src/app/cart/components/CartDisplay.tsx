"use client";

import QuantityButton from "@/components/QuantityButton";
import { useCartContext } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";

const CartDisplay = () => {
  const { cartItems } = useCartContext();
  return (
    <div>
      <div className="flex flex-col px-6 gap-4 py-2 mt-6">
        <Link href="/">
          <Image
            height={100}
            width={100}
            alt="icon close cart"
            src="/icons/ic-close.svg"
            className="h-3.5 w-3.5 hover:cursor-pointer"
          />
        </Link>
        <h1 className="text-4xl font-bold">Cart</h1>
      </div>

      {cartItems?.map((cartItem) => {
        return (
          <div
            key={cartItem.id}
            className="flex gap-5 items-center px-6 h-24 my-3"
          >
            <Image
              height={100}
              width={100}
              alt="icon close cart"
              src={cartItem.imageUrl}
              className="h-full"
            />

            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-semibold text-[17px]">{cartItem.name}</h2>
              <div className="flex items-center w-full justify-between">
                {/* create custom comp add,substract product*/}
                <QuantityButton
                  cartItem={cartItem}
                  bgColor="grey"
                  isItemExistOnCart={true}
                />
                <div className="opacity-55 flex justify-center">
                  {`$` + (cartItem.price * 1000).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartDisplay;

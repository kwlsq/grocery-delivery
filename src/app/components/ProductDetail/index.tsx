"use client";

import { DrawerContent } from "@/components/ui/drawer";
import { useProductContext } from "@/context/productContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";

const ProductDetail = () => {
  const { selectedProduct, getNextProduct, getPreviousProduct } =
    useProductContext();
  return (
    <DrawerContent data-cy="product-detail" className="max-w-md mx-auto left-1/2 h-full">
      <DialogTitle className="hidden">Product Detail</DialogTitle>
      <div className="flex justify-center items-start relative mb-9">
        <Image
          height={100}
          width={40}
          alt="arrow left icon"
          className="h-80 absolute left-0 top-[-1em]"
          src="/icons/ic-arrow-left.svg"
          onClick={() => getPreviousProduct()}
        />

        <div className="flex justify-center items-center mt-5">
          {selectedProduct?.product?.imageUrl && (
            <Image
              height={10}
              width={100}
              alt="product xxxx"
              className="w-100 max-w-60 object-contain h-60"
              src={selectedProduct.product.imageUrl}
            />
          )}
        </div>

        <Image
          height={100}
          width={40}
          alt="arrow right icon"
          className="h-80 scale-x-[-1] absolute right-0 top-[-1em]"
          src="/icons/ic-arrow-left.svg"
          onClick={() => getNextProduct()}
        />
      </div>
      <div className="mx-4 flex flex-col gap-3">
        <div className="font-bold text-3xl ">
          {selectedProduct?.product?.name}
        </div>
        <div className="font-semibold ">
          In 100 {selectedProduct?.product?.metadata.unit}
        </div>
        <div className="flex gap-5 justify-around border border-black-1 rounded-xl py-2 px-4">
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              {selectedProduct?.product?.metadata.calorie}
            </div>
            <div className="text-sm opacity-40">calorie</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              {selectedProduct?.product?.metadata.proteins}
            </div>
            <div className="text-sm opacity-40">proteins</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              {selectedProduct?.product?.metadata.fats}
            </div>
            <div className="text-sm opacity-40">fats</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              {selectedProduct?.product?.metadata.carbs}
            </div>
            <div className="text-sm opacity-40">carbs</div>
          </div>
        </div>
      </div>
      <div></div>
    </DrawerContent>
  );
};

export default ProductDetail;

"use client";

import { DrawerContent } from "@/components/ui/drawer";
import { useProductContext } from "@/context/productContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";

const ProductDetail = () => {
  const { selectedProduct } = useProductContext();
  return (
    <DrawerContent className="max-w-md mx-auto left-1/2 h-full">
      <DialogTitle className="hidden">Product Detail</DialogTitle>
      <div className="flex justify-center items-start relative mb-9">
        <Image
          height={100}
          width={40}
          alt="arrow left icon"
          className="h-80 absolute left-0 top-[-1em]"
          src="/icons/ic-arrow-left.svg"
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
        />
      </div>
      <div>{selectedProduct?.product?.name}</div>
      <div>In 100 {selectedProduct?.product?.metadata.unit}</div>
      <div className="flex gap-5">
        <div>
          <div>{selectedProduct?.product?.metadata.calorie}</div>
          <div>calorie</div>
        </div>
        <div>
          <div>{selectedProduct?.product?.metadata.proteins}</div>
          <div>proteins</div>
        </div>
        <div>
          <div>{selectedProduct?.product?.metadata.fats}</div>
          <div>fats</div>
        </div>
        <div>
          <div>{selectedProduct?.product?.metadata.carbs}</div>
          <div>carbs</div>
        </div>
      </div>
      <div>

      </div>
    </DrawerContent>
  );
};

export default ProductDetail;

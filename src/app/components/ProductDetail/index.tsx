"use client";

import { DrawerContent } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";

const ProductDetail = () => {
  return (
    <DrawerContent className="max-w-md mx-auto left-1/2 h-full">
      <DialogTitle className="hidden">Product Detail</DialogTitle>
      <div className="flex justify-center items-start relative">
        <Image
          height={100}
          width={40}
          alt="arrow left icon"
          className="h-80 absolute left-0 top-[-1em]"
          src="/icons/ic-arrow-left.svg"
        />

        <div className="flex justify-center items-center mt-5">
          <Image
            height={10}
            width={100}
            alt="product xxxx"
            className="w-100 object-contain h-60"
            src="/products/hot-sauce.webp"
          />
        </div>

        <Image
          height={100}
          width={40}
          alt="arrow right icon"
          className="h-80 scale-x-[-1] absolute right-0 top-[-1em]"
          src="/icons/ic-arrow-left.svg"
        />
      </div>
    </DrawerContent>
  );
};

export default ProductDetail;

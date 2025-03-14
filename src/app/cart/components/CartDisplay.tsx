"use client";

import Image from "next/image";

const CartDisplay = () => {
  return (
    <div>
      <div className="flex flex-col px-6 gap-4 py-2 mt-6">
        <Image
          height={100}
          width={100}
          alt="icon close cart"
          src="/icons/ic-close.svg"
          className="h-3.5 w-3.5 "
        />
        <h1 className="text-4xl font-bold">Cart</h1>
      </div>

      {/* kita kasih mapping */}
      <div className="flex gap-5 items-end px-6">
        <Image
          height={100}
          width={100}
          alt="icon close cart"
          src="/products/garlic.webp"
          className="h-24"
        />
        <div className="flex justify-center flex-col gap-2">
          <h2 className="font-semibold text-[17px]">Garlic</h2>
          <div className="flex items-center gap-10">
            {/* create custom comp add,substract product*/}
            <div className="flex items-center gap-5">
              <button className=" bg-grey rounded-full w-10 h-10 flex justify-center items-center">
                <Image
                  height={100}
                  width={100}
                  alt="icon substract product"
                  src="/icons/ic-substract.svg"
                  className="w-3"
                />
              </button>
              <div>1kg</div>
              <button className=" bg-grey rounded-full w-10 h-10 flex justify-center items-center">
                <Image
                  height={100}
                  width={100}
                  alt="icon add product"
                  src="/icons/ic-add.svg"
                  className="w-6"
                />
              </button>
            </div>
            <div className="opacity-55">$5.1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;

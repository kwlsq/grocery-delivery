import Image from "next/image";
import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="flex justify-between px-6 pt-10 pb-5">
      <h1 className="font-semibold text-xl">Vegetables</h1>
      <div className="flex gap-5">
        <Image
          width={100}
          height={100}
          alt="filter icon"
          src="icons/ic-filter.svg"
          className="size-[24px] cursor-pointer"
        ></Image>
        <Image
          width={100}
          height={100}
          alt="filter icon"
          src="icons/ic-search.svg"
          className="size-[24px] cursor-pointer"
        ></Image>
      </div>
    </div>
  );
};

export default Header;

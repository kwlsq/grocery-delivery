"use client";

import { useProductContext } from "@/context/productContext";

const CategoryNavigation = () => {
  const { categoryList } = useProductContext();
  console.log(categoryList);
  return (
    <div className="flex mx-6 gap-7 text-lg overflow-x-scroll flex-nowrap ">
      <div className="w-full hover:border-b border-black  whitespace-nowrap">
        All
      </div>

      {categoryList?.map((category, index) => (
        <div
          key={index}
          className="w-full hover:border-b border-black  whitespace-nowrap"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryNavigation;

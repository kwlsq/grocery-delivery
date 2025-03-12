"use client";

import { useCategoryContext } from "@/context/categoryContext";
import { useProductContext } from "@/context/productContext";

const CategoryNavigation = () => {
  const { categoryList } = useProductContext();
  const { activeCategory, setActiveCategory } = useCategoryContext();
  console.log(activeCategory);

  const isAllCategorySelected = activeCategory === "*";
  const baseCategoryClassname = `w-full whitespace-nowrap hover:cursor-pointer`;

  return (
    <div className="flex mx-6 gap-7 text-lg overflow-x-scroll flex-nowrap ">
      <div
        className={`${baseCategoryClassname} ${
          isAllCategorySelected ? "border-b-2 border-black" : ""
        } `}
        onClick={() => setActiveCategory("*")}
      >
        All
      </div>

      {categoryList?.map((category, index) => (
        <div
          key={index}
          className={`${baseCategoryClassname} ${
            category === activeCategory ? "border-b-2 border-black " : ""
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryNavigation;

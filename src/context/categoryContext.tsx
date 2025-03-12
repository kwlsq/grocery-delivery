"use client";

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface CategoryContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const useCategoryContext = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("Context usage out of provider");
  }
  return ctx;
};

export const CategoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("*");

  const updateActiveCategory = useCallback(
    (category: string) => {
      if (category !== activeCategory) {
        setActiveCategory(category);
      }
    },
    [activeCategory]
  );

  return (
    <CategoryContext.Provider
      value={{ activeCategory, setActiveCategory: updateActiveCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

import { API_BASE_URL } from "@/constants/api";
import { CartItem, ProductCartMap } from "@/types/cart";
import axios from "axios";

export const getCart = async (): Promise<ProductCartMap> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`);
    
    const productCartMap: ProductCartMap = response.data.reduce(
      (acc: ProductCartMap, item: CartItem) => {
        acc[item.productId] = item;
        return acc;
      },
      {} as ProductCartMap
    );

    return productCartMap; 
  } catch (error) {
    console.log("Error fetching products data, error: " + error);
    throw error;
  }
};


export const addToCart = async (data: CartItem) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting item to cart:", error);
    throw error;
  }
};

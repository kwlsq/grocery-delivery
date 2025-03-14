import { API_BASE_URL } from "@/constants/api";
import { ProductCartMap } from "@/types/cart";
import axios from "axios";

export const getCart = async (): Promise<ProductCartMap[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.log("Error fetching products data, error: " + error);
    throw error;
  }
};

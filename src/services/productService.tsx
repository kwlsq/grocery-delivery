import { API_BASE_URL } from "@/constants/api";
import { Product } from "@/types/product";
import axios from "axios";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.log("Error fetching products data, error: " + error);
    throw error;
  }
};

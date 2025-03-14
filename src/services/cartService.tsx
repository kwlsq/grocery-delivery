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
    console.error("Error fetching cart data:", error);
    throw error;
  }
};

export const getCartByProductID = async (
  productId: number
): Promise<CartItem | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      params: { productId: productId },
    });
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(
      `Error fetching cart item with productId ${productId}:`,
      error
    );
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

export const updateCartItem = async (
  productId: number,
  updatedData: Partial<CartItem>
) => {
  try {
    const existingItem = await getCartByProductID(productId);
    if (!existingItem) {
      return null;
    }

    const patchResponse = await axios.patch(
      `${API_BASE_URL}/cart/${existingItem.id}`,
      updatedData
    );

    return patchResponse.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeFromCart = async (productId: number) => {
  try {
    const existingItem = await getCartByProductID(productId);
    if (!existingItem) {
      return;
    }

    await axios.delete(`${API_BASE_URL}/cart/${existingItem.id}`);
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

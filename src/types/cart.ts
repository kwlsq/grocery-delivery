export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
}


export interface ProductCartMap {
    // Hashmap product ID as its key,
    // Product as its value
    [key: number]: CartItem;
}
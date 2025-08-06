import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./cartContext";
import  type {CartItem}  from "../../types/cartItem";



const CartProvider : FC<PropsWithChildren> = ( {children}) =>{
    const [cartItems , setCartItems]     = useState<CartItem[]>([]);
    const [totalAmount , setTotalAmount] = useState<number>(0);

    const addItemToCart = ( productID : string) =>{
        console.log(productID);
    }

    return(
        <CartContext.Provider value={{ cartItems , totalAmount , addItemToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
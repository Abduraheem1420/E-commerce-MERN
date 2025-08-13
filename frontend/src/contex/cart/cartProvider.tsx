import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./cartContext";
import  type {CartItem}  from "../../types/cartItem";
import { BASE_URL } from "../../components/constans/baseUrl";
import { useAuth } from "../Auth/AuthContext";



const CartProvider : FC<PropsWithChildren> = ( {children}) =>{
    const {token} = useAuth();
    const [cartItems , setCartItems]     = useState<CartItem[]>([]);
    const [totalAmount , setTotalAmount] = useState<number>(0);

    const [error , setError] = useState('');
    
    useEffect(() =>{

        if(!token) return;

        const fetchCart = async() =>{
            const Response = await fetch(`${BASE_URL}/cart` ,{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            });

            if(!Response.ok){
                setError('فشلت في جلب السلة ');
                return;
            }

            const cart = await Response.json();
            
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             const cartItemsMapped = cart.items.map(({product , quantity , unitPrice} : {product : any , quantity : any , unitPrice : number}) =>({
                        productId : product._id , 
                        title : product.title,
                        Image : product.image,
                        unitPrice : unitPrice ,
                        quantity : quantity
                    }))
            setCartItems(cartItemsMapped);   
            setTotalAmount(cart.totalAmount);    
         }

        fetchCart()
    },[token])

    const addItemToCart = async ( productId : string) =>{
        
        try{
             const Response = await fetch(`${BASE_URL}/cart/items`, {
                        method : 'POST',
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization" : `Bearer ${token}`,
                        },
                        body : JSON.stringify({
                            productId ,
                             quantity : 1,
                        })
                    });
                    if(!Response.ok){
                        setError('failed to add to cart');
                    }

                    const cart = await Response.json();
                    if(!cart) setError('failed to parse the data');

                  
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const cartItemsMapped = cart.items.map(({product , quantity , unitPrice} : {product : any ; quantity : number ; unitPrice : number}) =>({
                        productId : product._id , 
                        title : product.title,
                        Image : product.image,
                        unitPrice ,
                        quantity,
                    }))

                    setCartItems([...cartItemsMapped]);
                    setTotalAmount(cart.totalAmount);
            
        }catch(error){ 
            console.error(error)
        }
    }

    const updateItemInCart = async ( productId : string , quantity : number) =>{
         try{
             const Response = await fetch(`${BASE_URL}/cart/items`, {
                        method : 'PUT',
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization" : `Bearer ${token}`,
                        },
                        body : JSON.stringify({
                            productId ,
                             quantity,
                        })
                    });
                    if(!Response.ok){
                        setError('failed to Update to cart');
                    }

                    const cart = await Response.json();
                    if(!cart) setError('failed to parse the data');

                  
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const cartItemsMapped = cart.items.map(({product , quantity , unitPrice} : {product : any ; quantity : number ; unitPrice : number}) =>({
                        productId : product._id , 
                        title : product.title,
                        Image : product.image,
                        unitPrice ,
                        quantity,
                    }))

                    setCartItems([...cartItemsMapped]);
                    setTotalAmount(cart.totalAmount);
            
        }catch(error){ 
            console.error(error)
        }
    }

    return(
        <CartContext.Provider value={{ cartItems , totalAmount , addItemToCart , updateItemInCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
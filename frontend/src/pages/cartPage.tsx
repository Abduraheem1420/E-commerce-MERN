import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../contex/Auth/AuthContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../components/constans/baseUrl";
import { useCart } from "../contex/cart/cartContext";

const CartPage = () =>{
    const {token} = useAuth();
    const {cartItems , totalAmount} = useCart();
    const [error , setError] = useState('');

    /*useEffect(() =>{

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

            const data = await Response.json();
            setCart(data);       
         }

        fetchCart()
    },[token])*/
    
    return(

        <Container sx={{mt : '5'}}>
            <Typography variant="h3">السلة</Typography>
            {cartItems.map((item) =>(
                <Box>{item.title}</Box>
            ))}
        </Container>
    )
}


export default CartPage;
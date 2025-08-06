import { Container, Typography } from "@mui/material";
import { useAuth } from "../contex/Auth/AuthContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../components/constans/baseUrl";

const CartPage = () =>{
    const {token} = useAuth();
    const [cart , setCart] = useState();
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
            }

            const data = await Response.json();
            setCart(data);       
         }

        fetchCart()
    },[token])
    console.log({cart});
    return(

        <Container sx={{mt : '5'}}>
            <Typography variant="h3">السلة</Typography>
        </Container>
    )
}


export default CartPage;
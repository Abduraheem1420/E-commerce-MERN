import { Container , Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { BASE_URL } from "../components/constans/baseUrl";



const HomePage = () =>{
    const [products , setProduct] = useState<Product[]>([]);
    useEffect(() => { // Opening brace for useEffect callback
    const fetchData = async () => {
        const Response = await fetch(`${BASE_URL}/products`);
        const data = await Response.json();
        setProduct(data);
    }
    fetchData();
}, []);
    return(
        <Container sx={{ mt : 3}}>
            <Grid container spacing={4}>
               {products.map((p) =>(
                <Grid item md ={4}>
                    <ProductCard id={p._id} title={p.title} image={p.image} price={p.price}/>
                </Grid>
               ))}
                
            </Grid>
        </Container>
    )
}

export default HomePage;
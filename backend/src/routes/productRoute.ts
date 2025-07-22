import express from "express";
import { getAllProducts } from "../servises/productservice";

const router = express.Router();

router.get('/', async (req , res) =>{
    try{
        
const products = await getAllProducts();
    res.status(200).send(products)

    }catch{
         res.status(500).send("خطأ من قاعدة البيانات")
    }
})

export default router;
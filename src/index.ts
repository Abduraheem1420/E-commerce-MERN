import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./servises/productservice";
import cartRoute from "./routes/cartRoute";


const app = express();
const port = 3001;
app.use(express.json());
mongoose
.connect("mongodb://localhost:27017/Ecommerce")
.then(() =>{ console.log(" Database Connected")})
.catch((err) => console.log("Failed to Connect" , err));

//seed the Products after we connect with database
seedInitialProducts();

app.use('/user' , userRoute);
app.use('/products' , productRoute)
app.use('/cart' , cartRoute);

app.listen(port , () =>{
    console.log(`Server is Running at : http://localhost:${port}`)
})
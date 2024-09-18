import productModel from "../models/productModel";


export const getAllProducts = async () => {
    return await productModel.find();
};

export const seedInitialProducts = async () => {
    const products = [
        {title : "Gaming laptop" , image : "https://www.pcworld.com/wp-content/uploads/2024/03/alienware-gaming-laptop.jpg?quality=50&strip=all" , price : 500 ,  stock : 17}, 
    ]

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0) {
       await productModel.insertMany(products);
    }
};
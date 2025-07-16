import productModel from "../models/productModel";

export const getAllProducts = async () =>{
    return await productModel.find();
}

export const seedInitialProducts = async () => {
  const products = [
    { title: "Wireless Mouse", image: "https://picsum.photos/id/1080/400/300", price: 25, stock: 50 },
    { title: "Mechanical Keyboard", image: "https://picsum.photos/id/1060/400/300", price: 70, stock: 35 },
    { title: "Gaming Monitor", image: "https://picsum.photos/id/103/400/300", price: 150, stock: 20 },
    { title: "USB-C Hub", image: "https://picsum.photos/id/1044/400/300", price: 40, stock: 60 },
    { title: "Laptop Stand", image: "https://picsum.photos/id/1050/400/300", price: 30, stock: 45 },
    { title: "Bluetooth Speaker", image: "https://picsum.photos/id/1039/400/300", price: 55, stock: 30 },
    { title: "Smart Watch", image: "https://picsum.photos/id/1059/400/300", price: 120, stock: 25 },
    { title: "Wireless Charger", image: "https://picsum.photos/id/1067/400/300", price: 35, stock: 40 },
    { title: "Noise Cancelling Headphones", image: "https://picsum.photos/id/1011/400/300", price: 200, stock: 15 },
    { title: "Portable SSD", image: "https://picsum.photos/id/1027/400/300", price: 90, stock: 40 },
  ];
  const exitingProducts = await getAllProducts();
  if(exitingProducts.length === 0) await productModel.insertMany(products);
};

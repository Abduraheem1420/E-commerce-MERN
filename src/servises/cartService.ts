import { cartModel } from "../models/cartModel"
import productModel from "../models/productModel";

interface getCartForUser{
    userId : string
}

const createCartForUser = async ({userId} : getCartForUser) =>{
    const cart = await cartModel.create({userId , totalAmount : 0});
    await cart.save();
    return cart
}
interface getCartForActiveUser{
    userId : string
}

export const getCartForActiveUser = async ({userId} : getCartForActiveUser) =>{
let cart = await cartModel.findOne({userId , status : 'active'});
if(!cart) cart = await createCartForUser({userId})

    return cart;
}

interface ClearCart{
    userId : string;
}
export const clearCart = async ({userId} : ClearCart) =>{
    const cart = await getCartForActiveUser({userId});
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return {data : updatedCart , statusCode : 200};
}



interface addItemToCart{
    userId : string
    productId : any
    quantity : number
}


export const addItemToCart = async({userId , productId , quantity} : addItemToCart) =>{
    const cart = await getCartForActiveUser({userId});

    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    if(existsInCart) return {data: 'المنتج موجود عندك' , statusCode: 400};

    const product = await productModel.findById(productId);
    if(!product) return {data : 'المنتج غير موجود ', statusCode: 404};

    if(product.stock < quantity) return { data : " المخزون أقل من طلبك" , statusCode : 400};

    cart.items.push({product : productId , unitPrice: product.price , quantity : quantity})

    cart.totalAmount += product.price * quantity;
    const updatedCart = await cart.save();

    return {data : updatedCart , statusCode : 200};
}

interface updateItemInCart{
    userId : string
    productId : any
    quantity : number
}

export const updateItemInCart = async ({userId , productId , quantity} : updateItemInCart) =>{
  const cart = await getCartForActiveUser({userId});
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if(!existsInCart) return { data : "المنتج غير موجود عندك " , statusCode :400};

  const product = await productModel.findById(productId);
  if(!product) return {data : 'المنتج غير موجود ', statusCode: 404};
   if(product.stock < quantity) return { data : " المخزون أقل من طلبك" , statusCode : 400};


   const otherCartItems = cart.items.filter((p) => p.product !== productId);
   let total = otherCartItems.reduce((sum , product) =>{
    sum += product.quantity * product.unitPrice;
    return sum;
   },0)

   existsInCart.quantity = quantity;
   total += existsInCart.quantity * existsInCart.unitPrice;
   cart.totalAmount = total;

    const updatedCart = await cart.save();

    return {data : updatedCart , statusCode : 200};
}

interface deleteItemInCart{
    userId : string
    productId : any
}

export const deleteItemInCart = async ({userId , productId} : deleteItemInCart) =>{
 const cart = await getCartForActiveUser({userId});
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);
  if(!existsInCart) return { data : "المنتج غير موجود عندك " , statusCode :400};

  const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
   let total = otherCartItems.reduce((sum , product) =>{
    sum += product.quantity * product.unitPrice;
    return sum;
   },0)

   cart.items = otherCartItems;
   cart.totalAmount = total;
    const updatedCart = await cart.save();

    return {data : updatedCart , statusCode : 200};
}
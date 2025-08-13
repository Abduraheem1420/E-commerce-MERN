import { cartModel } from "../models/cartModel"
import { IOrderItem, orderModel } from "../models/orderModel";
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
    userId          : string
    populateProduct?: boolean
}

export const getCartForActiveUser = async ({userId , populateProduct} : getCartForActiveUser) =>{
    let cart;
    if(populateProduct){
        cart = await cartModel.findOne({userId , status : 'active'}).populate('items.product');
    }else{
        cart = await cartModel.findOne({userId , status : 'active'});
    }

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
    await cart.save();
    return {data : await getCartForActiveUser({userId , populateProduct : true}) , statusCode : 200};
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

     await cart.save();

    return {data : await getCartForActiveUser({userId , populateProduct : true}) , statusCode : 200};
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

     await cart.save();

    return {data : await getCartForActiveUser({userId , populateProduct : true})  , statusCode : 200};
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
     await cart.save();

    return {data : await getCartForActiveUser({userId , populateProduct : true})  , statusCode : 200};
}

interface CheckOut{
    userId  : string
    address : string
}

export const checkOut = async ({userId ,  address } : CheckOut) =>{
    if(!address) return {data: " يرجى إدخال العنوان" , statusCode : 400};
const cart = await getCartForActiveUser({userId});
const orderItems : IOrderItem[] = [];

for( const item of cart.items ){
    const product = await productModel.findById(item.product);
    if(!product) return {data : "المنتج غير موجود" , statusCode: 400};

    const orderItem : IOrderItem = {
    productTitle  : product.title,
    productImage  : product.image,
    unitPrice     : item.unitPrice,
    quantity      : item.quantity
    }

    orderItems.push(orderItem);
}
    const order = await orderModel.create({
         orderItems,
         userId,
         address,
         total  : cart.totalAmount
    })
    await order.save();
    cart.status = "completed";
    await cart.save();
    return { data : order , statusCode: 200}
}
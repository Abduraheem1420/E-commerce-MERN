import { cartModel } from "../models/cartModel"

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
if(!cart) await createCartForUser({userId})
    return cart
}
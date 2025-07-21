import express from "express";
import { addItemToCart, checkOut, clearCart, deleteItemInCart, getCartForActiveUser, updateItemInCart } from "../servises/cartService";
import validateJWT, { ExtendUser } from "../middlewares/validateJWT";

const router = express.Router();

router.get('/' , validateJWT , async (req : ExtendUser, res) =>{
    if (!req.user || !req.user._id) {
        return res.status(500).send('Authentication successful but user data not found on request.');
    }
    const userId = req.user._id;
    const cart = await getCartForActiveUser({userId});
    res.status(200).send(cart);
})

router.delete('/' , validateJWT , async (req : ExtendUser , res) =>{
    const userId = req.user._id;
    const Response = await clearCart({userId});
    res.status(Response.statusCode).send(Response.data);
})


router.post('/items' , validateJWT , async(req : ExtendUser , res) =>{
     const userId = req.user._id;
     const {productId , quantity} = req.body;
     const Response = await addItemToCart({userId , productId , quantity});
     res.status(Response.statusCode).send(Response.data);
})

router.put('/items' , validateJWT,async( req : ExtendUser , res) =>{
    const userId = req.user._id;
    const {productId , quantity} = req.body;
    const Response = await updateItemInCart({userId , productId , quantity});
    res.status(Response.statusCode).send(Response.data);
})

router.delete('/items/:productId' , validateJWT , async(req : ExtendUser , res) =>{
    const userId = req.user._id;
    const {productId} = req.params;
    const Response = await deleteItemInCart({userId , productId});
    res.status(Response.statusCode).send(Response.data);
})

router.post('/checkout' , validateJWT , async (req : ExtendUser , res) =>{
    const userId = req.user._id;
    const  { address } = req.body
    const Response = await checkOut({userId ,  address});
    res.status(Response.statusCode).send(Response.data);
})

export default router
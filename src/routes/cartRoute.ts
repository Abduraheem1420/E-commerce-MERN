import express from "express";
import { getCartForActiveUser } from "../servises/cartService";
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

export default router
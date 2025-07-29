import express from "express";
import { login, register } from "../servises/userServises";

const router = express.Router();


router.post('/register' , async (req , res) =>{
    try{
        const {firstName ,lastName, email, password} = req.body;
        const {statusCode , data} = await register({firstName ,lastName, email, password});
        res.status(statusCode).json(data);
    }catch{
         res.status(500).send("خطأ من قاعدة البيانات")
    }
})

router.post('/login', async (req , res) => {
    try{
            const {email , password} = req.body;
            const {statusCode , data} = await login({email , password});
            res.status(statusCode).json(data);
    }catch{
        res.status(500).send("خطأ من قاعدة البيانات")
    }
})


export default router;
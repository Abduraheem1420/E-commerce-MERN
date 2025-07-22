import { NextFunction  , Request , Response} from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

export interface ExtendUser extends Request{
    user?: any,
}

const validateJWT = (req : ExtendUser , res : Response, next : NextFunction) =>{
const authorizationHeader = req.get('authorization');
if(!authorizationHeader){
    res.status(403).send('لم يتم التحقق من المستخدم');
    return;
}
const token = authorizationHeader.split(' ')[1];
if(!token){
    res.status(403).send('رمز التحقق غير موجود');
    return;
}

jwt.verify(token , process.env.JWT_SECRET || '' , async (err , payload) =>{
    if(err){
        res.status(403).send('رمز التحقق فاسد');
        return;
    }
    if(!payload){
        res.status(403).send('حمولة الرمز فاسدة');
        return;
    }
    const userPayload = payload as {email : string , firstName : string , lastName : string};
    const user = await userModel.findOne({email : userPayload.email});

    req.user = user
    next();
})
}

export default validateJWT;
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const generateJWT = (data : any) =>{
 return jwt.sign(data , "hNjABof53eiyOblvITApfQghWYFaZ0kN");
}


interface registerParams{
firstName : string;
lastName : string;
email : string;
password : string;
}
export const register = async ({firstName , lastName , email , password} : registerParams) => {
    const findUser = await userModel.findOne({email : email});
    if(findUser) return { data :' المستخدم موجود' , statusCode: 400};
    const hashedPassword = await bcrypt.hash(password , 10);
    const newUser = new userModel({firstName , lastName , email , password : hashedPassword});
    await newUser.save();

    return {data :generateJWT({firstName , lastName , email}) , statusCode: 200};
}



interface loginParams{
email : string;
password : string;
}
export const login = async({password , email} : loginParams) =>{
    const findUser = await userModel.findOne({email : email});
    if(!findUser) return { data : 'كلمة السر أو البريد الإلكتروني غير صحيحين' , statusCode : 400};
    const passwordMatch = await bcrypt.compare(password , findUser.password);
    if(passwordMatch) return {data : generateJWT({firstName : findUser.firstName , lastName : findUser.lastName , email}) , statusCode : 200};
    return { data : 'كلمة السر أو البريد الإلكتروني غير صحيحين' , statusCode : 400};
}
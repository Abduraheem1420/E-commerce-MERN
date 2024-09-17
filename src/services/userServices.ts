import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

interface registerParams {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

export const register = async (params: registerParams)=>{
    const findUser = await userModel.findOne({email : params.email});

    if(findUser){
        return  {data : " المستخدم سبق وجوده" , statuscode: 400 }
    }

    const hashedPassword = await bcrypt.hash(params.password , 10);
    const newUser = new userModel({firstName : params.firstName, lastName : params.lastName , email : params.email , password : hashedPassword})
    await newUser.save()

    return {data : JWTGenerator({firstName :newUser.firstName , lastName : newUser.lastName , email : newUser.email }), statuscode: 200};
}

interface loginPrams{
    email: string,
    password: string
}

export const login = async({email, password}:loginPrams) => {
const findUser = await userModel.findOne({email});

if(!findUser) {
    return  {data : "تحقق من البريد أو كلمة السر" , statuscode : 400}
}


const passwordMatch = await bcrypt.compare(password,findUser.password);
if(passwordMatch) {
    return {data : JWTGenerator({email, firstName: findUser.firstName , lastName : findUser.lastName}) , statuscode : 200};
}

return {data : "تحقق من البريد أو كلمة السر" , statuscode : 400}
}

const JWTGenerator = (data: any) => {
    return JWT.sign( data , "TXw1OQ59A2n9ZrVTeg2SCM22BAni");
}
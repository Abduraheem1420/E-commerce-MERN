import mongoose , {Schema , ObjectId, Document} from "mongoose";
import { IProduct } from "./productModel";
const ICartStatusEnum = ["active" , "completed"]

export interface ICartItem {
    product : IProduct;
    unitPrice : number;
    quantity : number;
}

export interface ICart extends Document{
    userId : ObjectId | string;
    items : ICartItem[];
    totalAmount : number;
    status : "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
     product : {type : Schema.Types.ObjectId , ref :"Product" , required : true},
    unitPrice : {type : Number , required : true},
    quantity : {type : Number ,  default : 1 , required : true}
})

const cartSchema = new Schema<ICart>({
    userId : {type : Schema.Types.ObjectId , ref :"User" , required : true},
    items : [cartItemSchema],
    totalAmount :{type : Number , required : true},
    status : {type : String , enum : ICartStatusEnum , default : 'active'}
})

export const cartModel = mongoose.model<ICart>('Cart' , cartSchema);
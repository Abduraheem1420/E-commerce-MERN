import mongoose , {Schema , ObjectId, Document} from "mongoose";

export interface IOrderItem{
    productTitle : string;
    productImage : string;
    unitPrice    : number;
    quantity     : number;
}

export interface IOrder{
    orderItems : IOrderItem[];
    userId     : ObjectId | string;
    address    : string;
    total      : number;
}

const IOrderItemSchema = new Schema<IOrderItem>({
    productTitle : {type : String , required : true},
    productImage : {type : String , required : true},
    unitPrice    : { type : Number , required : true},
    quantity     : { type : Number , required : true}
})

const IOrderSchema = new Schema<IOrder>({
    orderItems   : [IOrderItemSchema],
    userId       : {type : Schema.Types.ObjectId , ref :"User" , required : true},
    address      : { type : String , required : true},
    total        : { type : Number , required : true}
})

export const orderModel = mongoose.model<IOrder>("Order" , IOrderSchema);


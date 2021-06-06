import { Items } from "./items.model";

export class Order{
    orderNo: number;
    purchaseDate:string;
    customerName: string;
    totalAmount:number;
    items:Items[];
}
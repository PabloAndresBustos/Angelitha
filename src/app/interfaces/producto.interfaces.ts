import { SubType } from "./subTypes.interface";

export interface Product{
    id: number,
    picture: any,
    subType: SubType,
    name: string,
    description: string,
    price: string,
}
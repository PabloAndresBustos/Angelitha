import { SubType } from "./subTypes.interface";

export interface Producto{
    id: string,
    picture: any,
    subType: SubType,
    name: string,
    description: string,
    price: number,
}
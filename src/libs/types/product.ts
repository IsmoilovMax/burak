import { Types } from "mongoose";
import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";
import { exitCode } from "process";


export interface Product {
    _id: Types.ObjectId;
    productStatus: ProductStatus | string;
    productCollection: ProductCollection;
    productName: string;
    productPrice:number;
    productLeftCount: number;
    productSize: ProductSize;
    productVolume?: number;
    productDesc?:string | undefined;
    productImages: string[];
    productViews: number;
    
}

export interface ProductInQuery {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;

}

export interface ProductInput {
    productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice:number;
    productLeftCount: number;
    productSize?: ProductSize;
    productVolume?: number;
    productDesc?:string;
    productImages?: string[];
    productViews?: number;    
}

export interface ProductUpdateInput {
    _id: Types.ObjectId;
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?:number;
    productLeftCount?: number;
    productSize?: ProductSize;
    productVolume?: number;
    productDesc?:string;
    productImages?: string[];
    productViews?: number;    
}
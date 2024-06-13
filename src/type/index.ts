/* eslint-disable @typescript-eslint/no-explicit-any */
export type StatusForm = 'success' | 'error' | 'loading'
export type TypeFormAddress = 'ADD' | 'EDIT';
export type Sort = 'ascending' | 'descending';
export type Category = {
    id: number;
    name: string;
    parentId:number;
    subCategory:Category[];
    urlImage: string;
    status: number;
};
export interface ProductItemStatisc {
    seoTitle: string,
    urlThumbnailImage:string,
    quantity: number,
    productId: number,
    productItemId: number,
    price: number,
    stock:number,
    viewCount: number,
    sku: string,
    id: number,
    name: string,
    value: string
}
export interface ProductItemSearch {
    id: number;
    productId?: number;
    seoTitle:string;
    quantity:number;
    urlThumbnailImage:string;
    price: number;
    sku: string;
    status: number;
    name: string;
    value: string;
}
export type ProductItem = {
    id: number;
    productId?: number;
    price: number;
    priceBeforeDiscount: number;
    valuePromotion?:number;
    type?:string;
    stock: number;
    sku: string;
    isCombo:boolean;
    viewCount: number;
    isMulti: boolean;
    urlImage: string;
    status: number;
    dateCreated: string;
    dateModify: string;
    name: string;
    value: string;
    guaranty:Guaranty
};
export type Variation = {
    id: number;
    name: string;
    value: string;
};
export interface Product {
    id: number;
    name: string;
    categoryId: number;
    seoDescription: string;
    valuePromotion?: number;
    type?:string;
    price: number;
    priceBeforeDiscount: number;
    seoTitle: string;
    file: any;
    urlThumbnailImage: string;urlImage: string;
    viewCount: number;
    PromotionName?:string,
    status: number;
    dateCreated: string;
    dateModify: string;
    items?: ProductItem[];
    variation?: Variation[];
    similarProduct?:Product[];
    guaranties?:Guaranty[];
}
export interface Guaranty {
    id: number;
    sku: string;
    name: string;
    description: string;
    datePeriod:string;
    period: number;
    dateCreated: string;
    dateModify: string;
    status: number;
    arrDate: any[];
}
export interface Department{
    id: number;
    phoneNumber: string;
    name: string;
    description: string;
    address:string;
    urbanDistrict: string;
    status: number;
    province: string;
    
}

export interface OptionPrice{
    label: string;
    value: number;
}
export interface OptionBase {
    label: string;
    value: string;
}

export interface Filter{
    categoryId?:number,
    productName?:string,
    optionPrice?:number[],
    page:number,
    pageSize:number,
    optionMaterial?:string[],
    sortOder:Sort,
    isPromotion?:boolean,
    productStatus?:number
}
export interface OptionSort{
    label: string;
    value: Sort;
}
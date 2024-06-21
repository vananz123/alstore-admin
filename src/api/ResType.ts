import { Department, Guaranty } from '@/type';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Role = 'super-admin' | 'admin' | 'customer' | 'sale' | undefined;
export interface RoleType {
    description: string;
    id: string;
    name: string;
}
export interface Claim {
    userId: string;
    id: number;
    claimType: string;
    claimValue: string;
}
export type ResponseUser = {
    id: string;
    roles: Role[];
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    userName: string;
    phoneNumber: string;
    roleVm: RoleType[];
    claims: Claim[];
};
export interface Result {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: any;
}
export interface PagingResult {
    items: any;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalRecords: number;
}
export interface InventoryDetail {
    historyInventionId: number;
    productItemId: number;
    price: number;
    quantity: number;
    stock:number;
    dateCreate: string;
    productId: number;
    sku: string;
    isMulti: boolean;
    seoTitle: string;
    name:string;
    value:string;
    urlThumbnailImage: string;
}
export interface Inventory {
    id: number;
    type: string;
    departmentId: number;
    status: number;
    dateCreate: string;
    dateModify: string;
    departmentName: string;
    items: InventoryDetail[];
}
export type Cart = {
    id: number;
    seoTitle: string;
    urlThumbnailImage: string;
    productId: number;
    productItemId: number;
    quantity: number;
    price: number;
    priceBeforeDiscount: number;
    valuePromotion: number;
    type: string;
    stock: number;
    sku: string;
    total: number;
    totalDiscount: number;
    name?: string;
    value?: string;
};
export type CartResult = {
    totalPrice: number;
    totalPriceBeforeDiscount: number;
    totalDiscount: number;
    items: Cart[];
};
export type Address = {
    id: number;
    userId: string;
    phoneNumber: string;
    streetNumber: string;
    wardCommune: string;
    urbanDistrict: string;
    province: string;
    isDefault: boolean;
};
export type PaymentType = {
    id: number;
    name: string;
};
export type PaymentMethod = {
    id: number;
    userId: string;
    paymentTypeId: number;
    privoder: string;
    accountNumber: string;
    isDefault: boolean;
    name: string;
};
export type PurchaseResult = {
    orderId?: number;
    paymentTypeName?: string;
    returnUrl?: string;
};
export type OrderStatus = {
    id: number;
    orderId: number;
    name: string;
    description: string;
    createAt: string;
    status: number;
};
export type Review = {
    id: number;
    userId: string;
    orderDetailId: number;
    createAt: string;
    rate?: number;
    comment: string;
    feelback?: string;
    feelbackAt?: string;
    user: ResponseUser;
};
export type OrderDetail = {
    id: number;
    seoTitle: string;
    orderId: string;
    urlThumbnailImage: string;
    productId: number;
    productItemId: number;
    quantity: number;
    price: number;
    priceBeforeDiscount: number;
    discountRate?: number;
    sku: string;
    total: number;
    totalDiscount: number;
    name?: string;
    value?: string;
    review?: Review;
    guaranty: Guaranty;
};
export type OrderPayment = {
    id: number;
    orderId: number;
    paymentDate: string;
    paymentType: string;
    privoder: string;
    accountNumber: string;
};
export type Order = {
    id: number;
    userId: string;
    isSuccsessedButton: boolean;
    isCanceledButton: boolean;
    isReturnedButton: boolean;
    user: ResponseUser;
    email:string;
    name:string;
    orderDate: string;
    orderTotal: number;
    totalProduct: number;
    orderDiscount: number;
    status?: OrderStatus[];
    address?: Address;
    paymentMethod?: OrderPayment;
    orderDetail?: OrderDetail[];
    shippingName: string;
    department: Department;
};
export interface Promotion {
    id: number;
    name: string;
    description: string;
    condition?: number;
    type: string;
    value: number;
    startDate: string;
    endDate: string;
    status: number;
    arrDate: any[];
}

export interface addressGHTK {
    id: number;
    name: string;
    pid: boolean;
    type: number;
    region: number;
    alias: string;
    is_picked: number;
    is_delivered: number;
}
export interface Warranty {
    id: number;
    orderDetailId: number;
    description: string;
    dateCreated: string;
    dateModify?: string | null;
    status: number;
    isSuccessedButton: boolean;
    isCanceledButton: boolean;
}

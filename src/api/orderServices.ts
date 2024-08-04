/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { PurchaseResult, Order } from './ResType';
export interface Result<T> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export interface PagingResult<T> {
    items: T;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalRecords: number;
}
export const create = async (userId: string, addressId: number, paymentMethodId: number) => {
    const order = {
        userId: userId,
        shippingMethodId: 1,
        addressId: addressId,
        paymentMethodId: paymentMethodId,
    };
    const res: Result<PurchaseResult> = await request.post(`/order`, order);
    return res;
};
export const paided = async (id: number) => {
    const res: Result<number> = await request.put(`/order/paided/${encodeURIComponent(id)}`);
    return res;
};
export const comfirm = async (id: number) => {
    const res: Result<number> = await request.put(`/order/confirmed/${encodeURIComponent(id)}`);
    return res;
};
export const successed = async (id: number) => {
    const res: Result<number> = await request.put(`/order/successed/${encodeURIComponent(id)}`);
    return res;
};
export const canceled = async (id: number) => {
    const res: Result<number> = await request.put(`/order/canceled/${encodeURIComponent(id)}`);
    return res;
};
export const returned = async (id: number) => {
    const res: Result<number> = await request.put(`/order/returned/${encodeURIComponent(id)}`);
    return res;
};
export const getOrderAdmin = async ({
    keyword,
    statusName,
    departmentId,
    page = 1,
    pageSize = 100,
}: {
    keyword?:string;
    statusName: string;
    departmentId: number;
    page: number;
    pageSize: number;
}) => {
    const params = {
        Keyword:keyword,
        StatusName: statusName,
        DepartmentId: departmentId,
        PageIndex: page,
        PageSize: pageSize,
    };
    const res: Result<PagingResult<Order[]>> = await request.get(`order/admin`, {
        params,
        paramsSerializer: {
            indexes: null, // by default: false
        },
    });
    return res;
};
export const getOrderAdminByOrderId = async (id: number) => {
    const res = await request.get(`/order/admin/${encodeURIComponent(id)}`);
    const resultObj: Order = res.resultObj;
    return resultObj;
};
export const getOrderByUserId = async (id: string, statusName: string | undefined) => {
    try {
        const params = {
            statusName: statusName,
            pageIndex: 1,
            pageSize: 100,
        };
        const res = await request.get(`/order/user/${encodeURIComponent(id)}`, { params });
        const resultObj: Order[] = res.resultObj.items;
        return resultObj;
    } catch (error: any) {
        return undefined;
    }
};
export const getOrderDetailByOrderId = async (id: number) => {
    try {
        const res = await request.get(`/order/${encodeURIComponent(id)}`);
        const resultObj: Order = res.resultObj;
        return resultObj;
    } catch (error: any) {
        return undefined;
    }
};

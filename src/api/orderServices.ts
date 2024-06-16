/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Result, PurchaseResult, Order, PagingResult } from './ResType';

export const create = async (userId: string, addressId: number, paymentMethodId: number) => {
    try {
        const order = {
            userId: userId,
            shippingMethodId: 1,
            addressId: addressId,
            paymentMethodId: paymentMethodId,
        };
        const res = await request.post(`/order`, order);
        const resultObj: PurchaseResult = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 201,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const paided = async (id: number) => {
    try {
        const res = await request.put(`/order/paided/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const comfirm = async (id: number) => {
    try {
        const res = await request.put(`/order/confirmed/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const successed = async (id: number) => {
    try {
        const res = await request.put(`/order/successed/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const canceled = async (id: number) => {
    try {
        const res = await request.put(`/order/canceled/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const returned = async (id: number) => {
    try {
        const res = await request.put(`/order/returned/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const getOrderAdmin = async (statusName: string, departmentId: number) => {
    try {
        const params = {
            StatusName: statusName,
            DepartmentId: departmentId,
            PageIndex: 1,
            PageSize: 100,
        };
        const res = await request.get(`order/admin`, {
            params,
            paramsSerializer: {
                indexes: null, // by default: false
            },
        });
        const resultObj: Order[] = res.resultObj.items;
        const paging: PagingResult = {
            items: resultObj,
            pageIndex: res.resultObj.pageIndex,
            pageCount: res.resultObj.pageCount,
            pageSize: res.resultObj.pageSize,
            totalRecords: res.resultObj.totalRecords,
        };
        return paging;
    } catch (error: any) {
        return undefined;
    }
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
        // const paging: PagingResult = {
        //     items: resultObj,
        //     pageIndex : res.resultObj.pageIndex,
        //     pageCount:res.resultObj.pageCount,
        //     pageSize:res.resultObj.pageSize,
        //     totalRecords:res.resultObj.totalRecords
        // }
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : paging,
        // }
        return resultObj;
    } catch (error: any) {
        //const resError: Result =error.response.data
        return undefined;
    }
};
export const getOrderDetailByOrderId = async (id: number) => {
    try {
        const res = await request.get(`/order/${encodeURIComponent(id)}`);
        const resultObj: Order = res.resultObj;
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : resultObj,
        // }
        return resultObj;
    } catch (error: any) {
        return undefined;
    }
};

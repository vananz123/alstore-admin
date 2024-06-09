/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import * as request from '../utils/request';
import { Result, Warranty } from './ResType';
export interface ResultWarranty  extends Result {
    resultObj: Warranty | undefined;
}
export const getAllByOrderDetailId = async (id:number) => {
    try {
        const params = {
            id:id
        }
        const res = await request.get(`/warranties`,{params});
        const resultObj: Warranty[] = res.resultObj;
        return resultObj
    } catch (error) {
        //const resError = error as AxiosError
        return undefined;
    }
};
export const GetBuId = async (id:number) => {
    try {
        const res = await request.get(`/warranties/${encodeURIComponent(id)}`);
        const resultObj: Warranty = res.resultObj;
        return resultObj
    } catch (error) {
        const resError = error as AxiosError
        return resError;
    }
};
export const create = async (warranty:Warranty) => {
    try {
        const body = {
            description : warranty.description,
            orderDetailId:warranty.orderDetailId
        }
        const res = await request.post(`/warranties`,body);
        const resultObj: ResultWarranty = res;
        return resultObj
    } catch (error:any) {
        const e: ResultWarranty = error.response.data
        return e;
    }
};
export const update = async (warranty:Warranty) => {
    try {
        
        const body = {
            id:warranty.id,
            description : warranty.description,
            orderDetailId:warranty.orderDetailId
        }
        const res = await request.put(`/warranties`,body);
        const resultObj: ResultWarranty = res;
        return resultObj
    } catch (error:any) {
        const e: ResultWarranty = error.response.data
        return e;
    }
};
export const del = async (id:number) => {
    try {
        const res = await request.del(`/warranties/${encodeURIComponent(id)}`);
        const resultObj: ResultWarranty = res;
        return resultObj
    } catch (error:any) {
        const e: ResultWarranty = error.response.data
        return e;
    }
};
export const successed = async (id:number) => {
    try {
        const res = await request.put(`/warranties/successed/${encodeURIComponent(id)}`);
        const resultObj: ResultWarranty = res;
        return resultObj
    } catch (error:any) {
        const e: ResultWarranty = error.response.data
        return e;
    }
};
export const canceled = async (id:number) => {
    try {
        const res = await request.put(`/warranties/canceled/${encodeURIComponent(id)}`);
        const resultObj: ResultWarranty = res;
        return resultObj
    } catch (error:any) {
        const e: ResultWarranty = error.response.data
        return e;
    }
};
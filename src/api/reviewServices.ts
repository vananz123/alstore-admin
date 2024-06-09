/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { PagingResult, Result, Review } from './ResType';
export interface PagingReview extends PagingResult {
    items: Review[];
}
export const getReivewByProductId = async (id: number,page:number) => {
    try {
        const res = await request.get(`/review/product/${encodeURIComponent(id)}?PageIndex=${encodeURIComponent(page)}&PageSize=3`);
        const paging: PagingReview = {
            items: res.resultObj.items,
            pageIndex : res.resultObj.pageIndex,
            pageCount:res.resultObj.pageCount,
            pageSize:res.resultObj.pageSize,
            totalRecords:res.resultObj.totalRecords
        }
        return paging
    } catch (error: any) {
        return undefined;
    }
};
export const createReivew = async (data: Review) => {
    try {
        const add = {
            userId:data.userId,
            orderDetailId:data.orderDetailId,
            rate:data.rate,
            comment:data.comment
        };
        const res = await request.post(`/review`, add);
        const resultObj: Review = res.resultObj;
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
export const feedback = async (id:number,fb:string) => { 
    try {
        const add = {
            id:id,
            feelback:fb
        };
        const res = await request.put(`/review/admin/feedback`, add);
        const resultObj: Review = res.resultObj;
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
export const updateReivew = async (data: Review) => {
    try {
        const add = {
            id:data.id,
            rate:data.rate,
            comment:data.comment
        };
        const res = await request.put(`/review`, add);
        const resultObj: Review = res.resultObj;
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
export const deleteReivew = async (id: number) => {
    try {

        const res = await request.del(`/review/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
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
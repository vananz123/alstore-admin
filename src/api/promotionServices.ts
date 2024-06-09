/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Promotion, Result } from './ResType';
export const getAllPromotion = async () => {
    try {
        const res = await request.get(`/promotion/type`);
        const resultObj: Promotion[] = res.resultObj;
        // const resp: Result = {
        //     error: '',
        //     isSuccessed: res.isSuccessed,
        //     message: res.message,
        //     statusCode: 200,
        //     resultObj: resultObj,
        // };
        return resultObj;
    } catch (error: any) {
        
        return undefined;
    }
}
export const getAllPromotionByType = async ( type:string) => {
    try {
        const res = await request.get(`/promotion/type/?type=${encodeURIComponent(type)}`);
        const resultObj: Promotion[] = res.resultObj;
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
}
export const getAllPromotionByPI = async ( id:number) => {
    try {
        const res = await request.get(`/promotion/product-item/${encodeURIComponent(id)}`);
        const resultObj: Promotion[] = res.resultObj;
        return resultObj;
    } catch (error: any) {
        return undefined;
    }
}
export const getById= async (id:number) => {
    try {
        const res = await request.get(`/promotion/${encodeURIComponent(id)}`);
        const resultObj: Promotion = res.resultObj;
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
}
export const CreatePromotion = async (data:any) => {
    try {
        const pro = {
            Name : data.name,
            description:data.description,
            type: data.type,
            value:data.value,
            startDate:data.startDate,
            endDate:data.endDate
        }
        const res = await request.post(`/promotion`,pro)
        const resultObj: Promotion[] = res.resultObj
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 201,
            resultObj: resultObj,
        };
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
}
export const UpdatePromotion = async (data:any) => {
    try {
        const pro = {
            id: data.id,
            Name : data.name,
            description:data.description,
            type :data.type,
            value: data.value,
            startDate:data.startDate,
            endDate:data.endDate
        }
        const res = await request.put(`/promotion`,pro)
        const resultObj: Promotion[] = res.resultObj
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
}
export const DeletaPromotion = async (id:number) => {
    try {
        const res = await request.del(`/promotion/${encodeURIComponent(id)}`)
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 204,
            resultObj: res.resultObj,
        };
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
}

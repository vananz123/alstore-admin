/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductItemStatisc } from '@/type';
import * as request from '../utils/request';
import {  Result } from './ResType';
export const getAnalysis = async (departmentId:number) => {
    try {
        const res = await request.get(`/statistic`,{departmentId});
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : res,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const getSaleOfDate = async () => {
    try {
        const res = await request.get(`/statistic/sale-of-date`);
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : res,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const getProductViewCount = async () => {
    try {
        const res = await request.get(`/statistic/product-view-count`);
        const resultObj: Product[] = res;
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const getProductItemSaleTop = async () => {
    try {
        const res = await request.get(`/statistic/product-sale`);
        const resultObj: ProductItemStatisc[] = res;
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductItemStatisc } from '@/type';
import * as request from '../utils/request';
import { Result } from './ResType';
export interface Analysis {
    totalSales: number;
    totalOrder: number;
    totalProduct: number;
}
export const getAnalysis = async (departmentId: number) => {
    const res: Analysis = await request.get(`/statistic?departmentId=${departmentId}`);
    return res;
};
export const getSaleOfDate = async (departmentId: number, dateEnd: Date | undefined, dateBegin?: Date) => {
    const params = {
        DepartmentId: departmentId,
        DateBegin: dateBegin,
        DateEnd: dateEnd || Date.now(),
    };
    const res = await request.get(`/statistic/sale-of-date`, { params });
    return res;
};
export const getProductViewCount = async () => {
    try {
        const res = await request.get(`/statistic/product-view-count`);
        const resultObj: Product[] = res;
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
export const getProductItemSaleTop = async () => {
    const res = await request.get(`/statistic/product-sale`);
    const resultObj: ProductItemStatisc[] = res.resultObj.items;

    return resultObj;
};

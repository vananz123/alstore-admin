/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Promotion } from './ResType';
export interface Result<T> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export const getAllPromotion = async () => {
    const res: Result<Promotion[]> = await request.get(`/promotion/type`);
    return res;
};
export const getAllPromotionByType = async (type: string) => {
    const res: Result<Promotion[]> = await request.get(`/promotion/type/?type=${encodeURIComponent(type)}`);
    return res;
};
export const getAllPromotionByPI = async (id: number) => {
    const res: Result<Promotion[]> = await request.get(`/promotion/product-item/${encodeURIComponent(id)}`);
    return res;
};
export const getById = async (id: number) => {
    const res: Result<Promotion> = await request.get(`/promotion/${encodeURIComponent(id)}`);
    return res;
};
export const CreatePromotion = async (data: any) => {
    const pro = {
        Name: data.name,
        description: data.description,
        type: data.type,
        value: data.value,
        startDate: data.startDate,
        endDate: data.endDate,
    };
    const res: Result<Promotion[]> = await request.post(`/promotion`, pro);
    return res;
};
export const UpdatePromotion = async (data: any) => {
    const pro = {
        id: data.id,
        Name: data.name,
        description: data.description,
        type: data.type,
        value: data.value,
        startDate: data.startDate,
        endDate: data.endDate,
    };
    const res: Result<Promotion> = await request.put(`/promotion`, pro);
    return res;
};
export const DeletaPromotion = async (id: number) => {
    const res: Result<number> = await request.del(`/promotion/${encodeURIComponent(id)}`);
    return res;
};

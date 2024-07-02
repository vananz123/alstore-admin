/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Guaranty } from '@/type';
export interface Result<T,> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export const getAllGuaranty = async (period: number = 0) => {
    const res: Result<Guaranty[]> = await request.get(`/guaranties?period=${period}`);
    return res;
};
export const getGuarantyById = async (id: number) => {
    const res: Result<Guaranty> = await request.get(`/guaranties/${encodeURIComponent(id)}`);
    return res;
};
export const createGuaranty = async (data: Guaranty) => {
    const guaranties = {
        name: data.name,
        period: data.period,
        sku: data.sku,
        description: data.description,
    };
    const res: Result<number> = await request.post(`/guaranties`, guaranties);
    return res;
};
export const updateGuaranty = async (data: Guaranty) => {
    const pro = {
        id: data.id,
        name: data.name,
        description: data.description,
        sku: data.sku,
        period: data.period,
        status: data.status,
    };
    const res: Result<Guaranty[]> = await request.put(`/guaranties`, pro);

    return res;
};
export const deleteGuaranty = async (id: number) => {
    const res: Result<number> = await request.del(`/guaranties/${encodeURIComponent(id)}`);
    return res;
};

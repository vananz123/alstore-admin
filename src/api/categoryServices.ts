/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Category } from '@/type';
export interface Result<T,> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export const getAllCate = async () => {
    const res: Result<Category[]> = await request.get(`/category`);
    return res;
};
export const getAllAdminCate = async (type: string = 'sub') => {
    const res: Result<Category[]> = await request.get(`/category/admin?type=${type}`);
    return res;
};
export const getCateById = async (id: number) => {
    const res: Result<Category> = await request.get(`/category/${encodeURIComponent(id)}`);
    return res;
};
export const createCate = async (data: Category) => {
    const cate = {
        name: data.name,
        parentId: data.parentId,
    };
    const res: Result<Category> = await request.post(`/category`, cate);
    return res;
};
export const updateCate = async (data: Category) => {
    const cate = {
        id: data.id,
        name: data.name,
        parentId: data.parentId,
        status: data.status,
    };
    const res: Result<Category> = await request.put(`/category`, cate);
    return res;
};
export const deleteCate = async (id: number) => {
    const res: Result<number> = await request.del(`/category/${encodeURIComponent(id)}`);
    return res;
};

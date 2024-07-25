/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Inventory } from './ResType';
import { ProductItemSearch } from '@/type';
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
export const getAllInventory = async ({ type, page, pageSize }: { type?: string; page: number; pageSize: number }) => {
    const params = {
        Type: type,
        PageIndex: page,
        PageSize: pageSize,
    };
    const res: Result<PagingResult<Inventory[]>> = await request.get(`/inventories`, { params });
    return res;
};
export const getById = async (id: number) => {
    const res: Result<Inventory> = await request.get(`/inventories/${encodeURIComponent(id)}`);
    return res;
};
export const importInventory = async (data: ProductItemSearch[]) => {
    const items: any[] = [];
    data.forEach((element) => {
        const item = {
            productItemId: element.id,
            price: Number(element.price),
            quantity: Number(element.quantity),
        };
        items.push(item);
    });
    const body = {
        items: items,
    };
    const res: Result<number> = await request.post(`/inventories/import`, body);
    return res;
};
export const exportInventory = async (toDepartmentId: number, data: ProductItemSearch[]) => {
    const items: any[] = [];
    data.forEach((element) => {
        const item = {
            price: element.price,
            productItemId: element.id,
            quantity: element.quantity,
        };
        items.push(item);
    });
    const body = {
        toDepartmentId: toDepartmentId,
        items: items,
    };
    const res: Result<number> = await request.put(`/inventories/export`, body);
    return res;
};
export const successed = async (id: number) => {
    const res: Result<string> = await request.put(`/inventories/successed/${encodeURIComponent(id)}`);
    return res;
};
export const canceled = async (id: number) => {
    const res: Result<string> = await request.put(`/inventories/canceled/${encodeURIComponent(id)}`);
    return res;
};

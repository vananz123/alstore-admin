/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Inventory, Result } from "./ResType";
import { ProductItemSearch } from "@/type";

export const getAllInventory = async (type?:string) => {
    const params = {
        type : type
    }
    const res :Result = await request.get(`/inventories`,{params});
    console.log(res)
    const resultObj: Inventory[]= res.resultObj;
    return resultObj;
};
export const getById = async (id:number) => {
    
    const res :Result = await request.get(`/inventories/${encodeURIComponent(id)}`);
    const resultObj: Inventory= res.resultObj;
    return resultObj;
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
    console.log(body)
    const res : Result = await request.post(`/inventories/import`, body);
    return res;
};
export const exportInventory = async (toDepartmentId:number, data: ProductItemSearch[]) => {
    const items: any[] = [];
    data.forEach((element) => {
        const item = {
            price: 0,
            productItemId: element.id,
            quantity: element.quantity,
        };
        items.push(item);
    });
    const body = {
        toDepartmentId:toDepartmentId,
        items: items,
    };
    const res: Result = await request.put(`/inventories/export`, body);
    return res;
};
export const successed = async (id:number) => {
    const res: Result = await request.put(`/inventories/successed/${encodeURIComponent(id)}`);
    return res;
};
export const canceled = async (id:number) => {
    const res: Result = await request.put(`/inventories/canceled/${encodeURIComponent(id)}`);
    return res;
};
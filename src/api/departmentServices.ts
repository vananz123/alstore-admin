/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Department } from '@/type';

export interface Result<T> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export const getAllDepartment = async () => {
    const res: Result<Department[]> = await request.get(`/departments/admin`);
    return res;
};
export const getDepartmentById = async (id: number) => {
    const res: Result<Department> = await request.get(`/departments/${encodeURIComponent(id)}`);
    return res;
};

export const createDepartment = async (data: Department) => {
    const departments = {
        phonenumber: data.phoneNumber,
        name: data.name,
        address: data.address,
        linkGoogleMap: data.linkGoogleMap,
        urbanDistrict: data.urbanDistrict,
        province: data.province,
        description: data.description,
    };
    const res: Result<number> = await request.post(`/departments`, departments);
    return res;
};
export const updateDepartment = async (data: Department) => {
    const departments = {
        id: data.id,
        phonenumber: data.phoneNumber,
        name: data.name,
        address: data.address,
        linkGoogleMap: data.linkGoogleMap,
        urbanDistrict: data.urbanDistrict,
        province: data.province,
        description: data.description,
        status: data.status,
    };
    const res : Result<Department[]> = await request.put(`/departments`, departments);
    return res;
};
export const deleteDepartment = async (id: number) => {
    const res :Result<number> = await request.del(`/departments/${encodeURIComponent(id)}`);
    return res;
};

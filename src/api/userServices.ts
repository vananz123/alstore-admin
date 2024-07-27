/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterUser } from '@/pages/Register';
import * as request from '../utils/request';
import { Address, RoleType } from './ResType';
import { ResponseUser } from './ResType';
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
export const getUser = async () => {
    const res: Result<ResponseUser> = await request.get(`/user`);
    return res;
};
export const getUserById = async (userId: string) => {
    const res: Result<ResponseUser> = await request.get(`/user/${encodeURIComponent(userId)}`);
    return res.resultObj;
};
export const getRoles = async () => {
    const res: Result<RoleType[]> = await request.get(`/role`);
    return res;
};
export const assginRoles = async (id: string, value: string[]) => {
    const res: Result<string> = await request.put(`/user/roles`, { id: id, roleName: value });
    return res;
};
export const assginClaims = async (id: string, value: string[]) => {
    const res: Result<string> = await request.post(`/user/claims`, { userId: id, claims: value });
    return res;
};
export const getAllUserForAdmin = async ({
    keyword,
    page = 1,
    pageSize = 100,
}: {
    keyword?: string;
    page: number;
    pageSize: number;
}) => {
    const params = {
        Keyword: keyword,
        PageIndex: page,
        PageSize: pageSize,
    };
    const res: Result<PagingResult<ResponseUser[]>> = await request.get(`/user/admin`, { params });
    return res;
};
export const Register = async (data: RegisterUser) => {
    const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        userName: data.userName,
        confirmPassword: data.confirmPassword,
    };
    const res:Result<ResponseUser> = await request.post(`/user`, user);
    return res;
};
export const update = async (data: ResponseUser) => {
    const user = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        userName: data.userName,
    };
    const res:Result<ResponseUser> = await request.put(`/user`, user);
    return res;
};
export const getAddressByUserId = async (id: string) => {
    const res:Result<Address[]> = await request.get(`/address/user/${encodeURIComponent(id)}`);
    return res;
};
export const addAddress = async (data: Address) => {
    const add = {
        province: data.province,
        phoneNumber: data.phoneNumber,
        streetNumber: data.streetNumber,
        urbanDistrict: data.urbanDistrict,
        userId: data.userId,
        wardCommune: data.wardCommune,
    };
    const res:Result<Address> = await request.post(`/address`, add);
    return res;
};
export const updateAddress = async (data: Address) => {
    const add = {
        id: data.id,
        province: data.province,
        phoneNumber: data.phoneNumber,
        streetNumber: data.streetNumber,
        urbanDistrict: data.urbanDistrict,
        userId: data.userId,
        wardCommune: data.wardCommune,
    };
    const res:Result<Address> = await request.put(`/address`, add);
    return res;
};
export const deleteAddress = async (id: number) => {
    const res:Result<string> = await request.del(`/address/${encodeURIComponent(id)}`);
        return res;
};
export const forgotPass = async (email: string) => {
    const res:Result<string> = await request.post(`/user/forgot-password?email=${encodeURIComponent(email)}`, {});
        return res;
};
export const resetPass = async (token: string, email: string, password: string) => {
    const re = {
        token: token,
        email: email,
        password: password,
        confirmPassword: password,
    };
    const res:Result<string> = await request.post(`/user/reset-password`, re);
    
    return res;
};

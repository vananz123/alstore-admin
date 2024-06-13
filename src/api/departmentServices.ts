/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result } from './ResType'
import { Department } from '@/type'
interface ListDepartments extends Result{
    resultObj:Department[] 
}
export const getAllDepartment = async()=>{ 
    try{
        const res = await request.get(`/departments/admin`)
        const resultObj : ListDepartments  = res
       
        return resultObj
    }catch(error:any){
        const resError: ListDepartments =error.response.data
        return resError
    }
}
export const getDepartmentById = async(id:number)=>{
    try{
        const res = await request.get(`/departments/${encodeURIComponent(id)}`)
        const resultObj : Department  = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}

export const createDepartment = async(data:Department)=>{
    try{
        const departments = {
            phonenumber:data.phoneNumber,
            name:data.name,
            address:data.address,
            urbanDistrict:data.urbanDistrict,
            province:data.province,
            description:data.description
        }
        const res = await request.post(`/departments`,departments)
        const resultObj  = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:201,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const updateDepartment = async(data:Department)=>{
    try{
        const departments = {
            id: data.id,
            phonenumber:data.phoneNumber,
            name:data.name,
            address:data.address,
            urbanDistrict:data.urbanDistrict,
            province:data.province,
            description:data.description,
            status: data.status
            
        }
        console.log(departments)
        const res = await request.put(`/departments`,departments)
        const resultObj: Department[] = res.resultObj
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
export const deleteDepartment = async(id:number)=>{
    try{
        const res = await request.del(`/departments/${encodeURIComponent(id)}`)
        const resultObj  = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:204,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        const resError: Result =error.response.data
        return resError
    }
}

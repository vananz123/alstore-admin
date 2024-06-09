/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result } from './ResType'
import { Guaranty } from '@/type'
export const getAllGuaranty = async(period:number =0)=>{ 
    try{
        const res = await request.get(`/guaranties?period=${period}`)
        const resultObj : Guaranty[]  = res.resultObj
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
export const getGuarantyById = async(id:number)=>{
    try{
        const res = await request.get(`/guaranties/${encodeURIComponent(id)}`)
     
        const resultObj : Guaranty  = res.resultObj
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

export const createGuaranty = async(data:Guaranty)=>{
    try{
        const guaranties = {
            name:data.name,
            period: data.period,
            sku: data.sku,
            description:data.description
        }
        const res = await request.post(`/guaranties`,guaranties)
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
export const updateGuaranty = async(data:Guaranty)=>{
    try{
        const pro = {
            id: data.id,
            name : data.name,
            description:data.description,
            sku: data.sku,
            period : data.period,
            status: data.status
            
        }
        console.log(pro)
        const res = await request.put(`/guaranties`,pro)
        const resultObj: Guaranty[] = res.resultObj
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
export const deleteGuaranty = async(id:number)=>{
    try{
        const res = await request.del(`/guaranties/${encodeURIComponent(id)}`)
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
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}

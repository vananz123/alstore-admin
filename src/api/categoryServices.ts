/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result } from './ResType'
import { Category } from '@/type'
export const getAllCate = async()=>{ 
    try{
        const res = await request.get(`/category`)
        const resultObj : Category[]  = res.resultObj
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
export const getAllAdminCate = async(type:string = 'sub')=>{ 
    try{
        const res = await request.get(`/category/admin?type=${type}`)
        const resultObj : Category[]  = res.resultObj
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
export const getCateById = async(id:string)=>{
    try{
        const res = await request.get(`/category/${encodeURIComponent(id)}`)
        const resultObj : Category  = res.resultObj
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

export const createCate = async(data:Category)=>{
    try{
        const cate = {
            name:data.name,
            parentId:data.parentId
        }
        const res = await request.post(`/category`,cate)
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
export const updateCate = async(data:Category)=>{
    try{
        const cate = {
            id:data.id,
            name:data.name,
            parentId:data.parentId,
            status:data.status
        }
        const res = await request.put(`/category`,cate)
        const resultObj:Category  = res.resultObj
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
export const deleteCate = async(id:string)=>{
    try{
        const res = await request.del(`/category/${encodeURIComponent(id)}`)
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
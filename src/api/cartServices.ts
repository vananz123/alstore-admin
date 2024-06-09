/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result,CartResult } from './ResType'
export const getCart = async(id:string)=>{
    try{
        const res = await request.get(`/cart/user/${encodeURIComponent(id)}`)
        const resultObj : CartResult = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        const resError: Result =error.response.data
        return resError
    }
}
export const addCart = async(userId:string, productItemId:number,quantity:number)=>{
    try{
        const item ={
            userId:userId,
            productItemId:productItemId,
            quantity:quantity
        }
        const res = await request.post(`/cart`,item)
        const resultObj : CartResult = res.resultObj
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
export const updateCart = async(id:number,quantity:number)=>{
    try{
        const item ={
            id:id,
            quantity:quantity
        }
        const res = await request.put(`/cart`,item)
        const resultObj : CartResult = res.resultObj
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
export const deleteCart = async(id:number)=>{
    try{
        const res = await request.del(`/cart/${encodeURIComponent(id)}`)
        const resultObj : CartResult = res.resultObj
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
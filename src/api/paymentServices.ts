/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result,PaymentType, PaymentMethod } from './ResType'

export const getPaymentType = async()=>{
    try{
        const res = await request.get(`/payment`)
        const resultObj : PaymentType[] = res.resultObj
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
export const getPaymentMethodByUserId = async(id:string)=>{
    try{
        const res = await request.get(`/payment/user/${encodeURIComponent(id)}`)
        const resultObj : PaymentMethod[] = res.resultObj
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : resultObj
        // }
        return resultObj
    }catch(error:any){
        return undefined
    }
}
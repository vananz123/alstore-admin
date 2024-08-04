/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Result, addressGHTK } from './ResType';
const baseUrl =import.meta.env.VITE_BASE_URL_GHTK
export const getAllProvince = async()=>{
    try{
        const response = await axios.get(`${baseUrl}/address/list`)
        const resultObj : addressGHTK[] = response.data.data
            const resp: Result ={
                error :'',
                isSuccessed:true,
                message:'success',
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
export const getAllDistrict = async(provinceId:number)=>{
    try{
        const response = await axios.get(`${baseUrl}/address/list?parentId=${encodeURIComponent(provinceId)}&type=3`)
        const resultObj : addressGHTK[] = response.data.data
            const resp: Result ={
                error: '',
                isSuccessed:true,
                message:'success',
                statusCode:200,
                resultObj: resultObj
            }
            return resp
        }catch(error:any){
            console.log(error.response.data)
            const resError: Result = error.response.data
            return resError
    }   
}
export const getAllWard = async(districtId:number)=>{
    try{
        const response = await axios.get(`${baseUrl}/address/list?parentId=${encodeURIComponent(districtId)}&type=1`)
        const resultObj : addressGHTK[] = response.data.data
            const resp: Result ={
                error: '',
                isSuccessed:true,
                message:'success',
                statusCode:200,
                resultObj: resultObj
            }
            return resp
        }catch(error:any){
            console.log(error.response.data)
            const resError: Result = error.response.data
            return resError
    }   
}
export const getAllRoad = async(wardId:number)=>{
    try{
        const response = await axios.get(`${baseUrl}/address/hamlet?parentId=${encodeURIComponent(wardId)}`)
        const resultObj : addressGHTK[] = response.data.data.hamlet_address

            const resp: Result ={
                error: '',
                isSuccessed:true,
                message:'success',
                statusCode:200,
                resultObj: resultObj
            }
            return resp
        }catch(error:any){
            console.log(error.response.data)
            const resError: Result = error.response.data
            return resError
    }   
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { LoginType } from '@/pages/Login'
import { Result } from './ResType'
export type ResponseLoginType ={
    accessToken:string,
    refreshToken:string
}
export interface ResultLogin extends Result{
    resultObj:ResponseLoginType
}
export const loginGoogle = async(accessToken:string)=>{
    try{
        const res = await request.post(`/authentication/login-google`,{accessToken:accessToken,provider:"google"})
        const resultObj : ResultLogin = res
        return resultObj
    }catch(error:any){
        const resError: ResultLogin =error.response.data
        return resError
    }
}
export const login = async(user:LoginType)=>{
    try{
        const login ={
            email: user.email,
            password: user.password,
            rememberMe:true
          }
        const res = await request.post(`/authentication/login`,login)
        const resultObj : ResultLogin = res
          return resultObj
    }catch(error:any){
        const resError: ResultLogin =error.response.data
        return resError
    }
}

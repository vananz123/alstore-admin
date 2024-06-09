/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import {  PagingResult, Promotion, Result } from './ResType'
import {  Product ,Filter} from '@/type'
import { UploadFile } from 'antd'
export interface PagingProduct extends PagingResult{
    items:Product[]
}
export interface ResultProduct extends Result{
    resultObj: Product
}
export const getAllProduct = async()=>{
    try{
        const res = await request.get(`/product`)
        const resultObj : Product[]  = res.resultObj
        return resultObj
    }catch(error:any){
        return undefined
    }
}
export const getProductDetail = async(id:number)=>{
    try{
        const res = await request.get(`/product/${encodeURIComponent(id)}`)
        const resultObj : Product  = res.resultObj
        return resultObj
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : resultObj
        // }
        // return resp
    }catch(error){
        return undefined
    }
}
export const getProductPagingByFilter = async(filter:Filter)=>{
    let material:string = ""
        filter.optionMaterial?.forEach((e:string)=>{
            material += e + ","
        })
        const params ={
            categoryId:filter.categoryId,
            productName:filter.productName,
            optionPrice:filter.optionPrice,
            pageIndex: filter.page,
            pageSize:filter.pageSize,
            MaterialName:material,
            sortOder: filter.sortOder || 'ascending',
            isPromotion:filter.isPromotion || false,
            productStatus:filter.productStatus
        }
        const res = await request.get(`/product/filter`,{
            params,
            paramsSerializer: {
                indexes: null // by default: false
            }
        })
        const paging: PagingProduct = res.resultObj;
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : paging,
        }
        return resp
}
export const addProduct = async(data:Product)=>{
    try{
        const pro ={
            name: data.name,
            seoDescription: data.seoDescription,
            seoTitle: data.seoTitle,
            categoryId: data.categoryId,
        }
        const res= await request.post(`/product`,pro)
        const resultObj :ResultProduct  = res
        if(data.file){
            await uploadThumbnailImage(resultObj.resultObj.id, data.file[0].originFileObj)
        }
        return resultObj
    }catch(error:any){
        const resError: ResultProduct =error.response.data
        return resError
    }
}
export const updateProduct = async(data:Product)=>{
    try{ 
        const pro ={
            id:data.id,
            name: data.name,
            seoDescription: data.seoDescription,
            seoTitle: data.seoTitle,
            status:data.status,
            categoryId: data.categoryId
        }
        const res= await request.put(`/product`,pro)
        const resultObj:ResultProduct   = res
        if(data.file){
            await uploadThumbnailImage(resultObj.resultObj.id, data.file[0].originFileObj)
        }
        return resultObj
    }catch(error:any){
        const resError: ResultProduct =error.response.data
        return resError
    }
}
export const deleteProduct = async(id:number)=>{
    try{
        const res= await request.del(`/product/${encodeURIComponent(id)}`)
        const resultObj   = res.resultObj
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
export const uploadThumbnailImage = async(id:number,data:any)=>{
    try{
        const formData = new FormData()
        formData.append('ImageFile',data);

        const res= await request.put(`/product/${encodeURIComponent(id)}/thumbnail-image`,formData)
        const resultObj   = res.resultObj
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
export const uploadImage = async(id:number,data:UploadFile[])=>{
    try{
        const formData = new FormData()
        formData.append('Id',id.toString())
        data.forEach((element:any) => {
            formData.append('ImageFile',element.originFileObj);
        });
        const res= await request.post(`/product/images`,formData)
        const resultObj   = res.resultObj
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
export const updateImage = async(id:number,data:any)=>{
    try{
        const formData = new FormData()
        formData.append('Id',id.toString())
        formData.append('ImageFile',data.originFileObj);
        const res= await request.put(`/product/images`,formData)
        const resultObj   = res.resultObj
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
export const deleteImage = async(id:number,name:string)=>{
    try{
        const res= await request.del(`/product/${encodeURIComponent(id)}/images?name=${encodeURIComponent(name)}`)
        const resultObj   = res.resultObj
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
export const addProductNoSize = async(id:number, price:number,stock:number)=>{
    try{
        const res= await request.post(`/product/${encodeURIComponent(id)}/product-item`,{price:price,stock:stock})
        const resultObj :Product  = res.resultObj
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
function randomNumber(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const addProductSize = async(id:number, data:any[])=>{
    try{
        const pro:any[]= []
        data.forEach((element:any) => {
            const item ={
                id:randomNumber(1,1000),
                price:element.price,
                stock:element.stock,
                sku:element.sku,
                value:element.value
            }
            pro.push(item)
        });

        const res= await request.post(`/product/${encodeURIComponent(id)}/product-item-size`,pro)
        const resultObj:Product   = res.resultObj
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
export const addVariation = async(id:number, data:any[])=>{
    try{
        const pro:any[]= []
        data.forEach((element:any) => {
            const item ={
                id:randomNumber(1,1000),
                name:element.name,
                value:element.value,
                selected:true
            }
            pro.push(item)
        });
        const res= await request.put(`/product/${encodeURIComponent(id)}/variation`,{variations:pro})
        const resultObj :Product  = res.resultObj
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
export const assignGuaranties = async(id:number, guarantyId:number)=>{
    try{
        const res= await request.put(`/product/product-item/guaranties`,{productItemId:id,guarantyId:guarantyId})
        const resultObj :Product  = res.resultObj
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
export const assignPromotion = async(id:number, data:Promotion[])=>{
    try{
        const pro:any[]= []
        data.forEach((element:Promotion) => {
            const item ={
                id:element.id,
                value:'',
                name:'',
                selected:true,
            }
            pro.push(item)
        });
        const res= await request.put(`/product/product-item/promotions`,{id:id,items:pro})
        const resultObj:Product   = res.resultObj
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
export const productViewCount = async(id:number)=>{
    try{
        
        const res= await request.put(`/product/view-count/${id}`)
        const resultObj   = res.resultObj
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
export const productItemViewCount = async(id:number)=>{
    try{
        
        const res= await request.put(`/product/product-item/view-count/${id}`)
        const resultObj   = res.resultObj
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
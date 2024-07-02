/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Promotion } from './ResType';
import { Product, Filter, ProductItem, ProductItemSearch } from '@/type';
import { UploadFile } from 'antd';
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
export const getAllProduct = async () => {
    const res: Result<Product[]> = await request.get(`/product`);
    return res;
};
export const getProductDetail = async (id: number, departmentId: number) => {
    const params = {
        DepartmentId: departmentId,
    };
    const res: Result<Product> = await request.get(`/product/admin/${encodeURIComponent(id)}`, { params });
    return res;
};
export const getProductPagingByFilter = async (filter: Filter) => {
    let material: string = '';
    filter.optionMaterial?.forEach((e: string) => {
        material += e + ',';
    });
    const params = {
        categoryId: filter.categoryId,
        productName: filter.productName,
        optionPrice: filter.optionPrice,
        pageIndex: filter.page,
        pageSize: filter.pageSize,
        MaterialName: material,
        sortOder: filter.sortOder || 'ascending',
        isPromotion: filter.isPromotion || false,
        productStatus: filter.productStatus,
    };
    const res: Result<PagingResult<Product[]>> = await request.get(`/product/filter`, {
        params,
        paramsSerializer: {
            indexes: null, // by default: false
        },
    });
    return res;
};

export const addProduct = async (data: Product) => {
    const pro = {
        name: data.name,
        seoDescription: data.seoDescription,
        seoTitle: data.seoTitle,
        categoryId: data.categoryId,
    };
    const res: Result<Product> = await request.post(`/product`, pro);
    if (data.file && data.file[0].originFileObj) {
        await uploadThumbnailImage(res.resultObj.id, data.file[0].originFileObj);
    }
    return res;
};
export const updateProduct = async (data: Product) => {
    const pro = {
        id: data.id,
        name: data.name,
        seoDescription: data.seoDescription,
        seoTitle: data.seoTitle,
        status: data.status,
        categoryId: data.categoryId,
    };
    const res: Result<Product> = await request.put(`/product`, pro);
    if (data.file && data.file[0].originFileObj) {
        await uploadThumbnailImage(res.resultObj.id, data.file[0].originFileObj);
    }
    return res;
};
export const deleteProduct = async (id: number) => {
    const res: Result<number> = await request.del(`/product/${encodeURIComponent(id)}`);
    return res;
};
export const uploadThumbnailImage = async (id: number, data: any) => {
    const formData = new FormData();
    formData.append('ImageFile', data);
    const res: Result<number> = await request.put(`/product/${encodeURIComponent(id)}/thumbnail-image`, formData);
    return res;
};
export const uploadImage = async (id: number, data: UploadFile[]) => {
    const formData = new FormData();
    formData.append('Id', id.toString());
    data.forEach((element: any) => {
        formData.append('ImageFile', element.originFileObj);
    });
    const res: Result<number> = await request.post(`/product/images`, formData);
    return res;
};
export const updateImage = async (id: number, data: any) => {
    const formData = new FormData();
    formData.append('Id', id.toString());
    formData.append('ImageFile', data.originFileObj);
    const res: Result<number> = await request.put(`/product/images`, formData);

    return res;
};
export const deleteImage = async (id: number, name: string) => {
    const res: Result<number> = await request.del(
        `/product/${encodeURIComponent(id)}/images?name=${encodeURIComponent(name)}`,
    );
    return res;
};
function randomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const searchProductItemBySeo = async (key: any, type?: string) => {
    const res = await request.get(`/product/product-item/search/${encodeURIComponent(key)}?type=${type}`);
    const resultObj: ProductItemSearch[] = res.resultObj;
    return resultObj;
};
export const addProductItem = async (isSize: boolean, data: ProductItem) => {
    const productitem = {
        productId: data.productId,
        isSize: isSize,
        price: data.price,
        sku: data.sku || '',
        value: data.value || '',
    };
    const res: Result<Product> = await request.post(`/product/product-item`, productitem);
    return res;
};
export const updateProductItem = async (data: ProductItem) => {
    const productitem = {
        productItemId: data.id,
        productId: data.productId,
        price: data.price,
        sku: data.sku,
        value: data.value,
        status: 1,
    };
    const res: Result<Product> = await request.put(`/product/product-item`, productitem);
    return res;
};
export const deleteProductItem = async (id: number) => {
    const res: Result<Product> = await request.del(`/product/product-item/${id}`);
    return res;
};
export const addVariation = async (id: number, data: any[]) => {
    const pro: any[] = [];
    data.forEach((element: any) => {
        const item = {
            id: randomNumber(1, 1000),
            name: element.name,
            value: element.value,
            selected: true,
        };
        pro.push(item);
    });
    const res: Result<Product> = await request.put(`/product/${encodeURIComponent(id)}/variation`, { variations: pro });
    return res;
};
export const assignGuaranties = async (id: number, guarantyId: number) => {
    const res: Result<Product> = await request.put(`/product/product-item/guaranties`, {
        productItemId: id,
        guarantyId: guarantyId,
    });
    return res;
};
export const assignPromotion = async (id: number, data: Promotion[]) => {
    const pro: any[] = [];
    data.forEach((element: Promotion) => {
        const item = {
            id: element.id,
            value: '',
            name: '',
            selected: true,
        };
        pro.push(item);
    });
    const res: Result<Product> = await request.put(`/product/product-item/promotions`, { id: id, items: pro });
    return res;
};

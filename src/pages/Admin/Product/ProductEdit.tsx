import ProductForm from '@/conponents/ProductForm';
import * as productServices from '@/api/productServices';
import React, { useEffect } from 'react';
import { Product } from '@/type'
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { StatusForm } from '@/type';
function ProductEdit() {
    const { id } = useParams();
    const [product, setProduct] = React.useState<Product>();
    const [status,setStatus] = React.useState<StatusForm>('loading')
    useEffect(() => {
        if (id != undefined && status == 'loading') {
            const getProduct = async () => {
                const res = await productServices.getProductDetail(Number(id));
                setProduct(res);
            };
            getProduct()
        }
    }, [id ,status]);
    return (
        <div>
            {product != undefined ? <ProductForm product={product} onSetState={setProduct} onSetStatus={setStatus}/>:<Skeleton/>}
        </div>
    );
}

export default ProductEdit;

import ProductForm from '@/conponents/ProductForm';
import React, { useEffect } from 'react';
import { Product } from '@/type'
import { StatusForm } from '@/type';
function ProductAdd() {
    const [product, setProduct] = React.useState<Product>();
    const [status,setStatus] = React.useState<StatusForm>('loading')
    useEffect(()=>{
        
    },[status])
    return (
        <div>
            <ProductForm product={product} onSetState={setProduct} onSetStatus={setStatus}/>
        </div>
    );
}

export default ProductAdd;
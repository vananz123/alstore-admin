import ProductForm from '@/conponents/ProductForm';
import {  FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from '@tanstack/react-query';
import { Product } from '@/type';
import useNotification from '@/hooks/useNotification';
import GoBack from '@/conponents/GoBack';
import {addProduct} from '@/api/productServices';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
function ProductAdd() {
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();
    const {contextHolder,openNotification} = useNotification()
    const createProduct = useMutation({
        mutationKey: ['ceate-product'],
        mutationFn: (body: Product) => addProduct(body),
        onSuccess: (res) => {
            if (res.isSuccessed === true) {
                navigate(`/product/edit/${res.resultObj.id}`);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (error.response?.status === 403) {
                showBoundary(error);
            } else {
                openNotification('error', error.response?.data.message);
            }
        },
    });
    const onFinish: FormProps<Product>['onFinish'] = async (values) => {
        if(values) createProduct.mutateAsync(values);
    };
    const onFinishFailed: FormProps<Product>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {contextHolder}
            <GoBack/>
            <ProductForm data={undefined} isLoading={createProduct.isPending} onFinish={onFinish} onFinishFailed={onFinishFailed}/>
        </div>
    );
}

export default ProductAdd;
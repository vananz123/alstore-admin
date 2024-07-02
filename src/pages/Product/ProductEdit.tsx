import ProductForm from '@/conponents/ProductForm';
import * as productServices from '@/api/productServices';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormProps, Skeleton, Space } from 'antd';
import { useAppSelector } from '@/app/hooks';
import { selectDepartment } from '@/app/feature/department/reducer';
import ProductItemConfig from './ProductItemConfig';
import UploadImages from '@/view/product/UploadImages';
import { PlusOutlined } from '@ant-design/icons';
import VariationFrom from '@/conponents/VariationForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';
import useNotification from '@/hooks/useNotification';
import { Product } from '@/type';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import GoBack from '@/conponents/GoBack';
function ProductEdit() {
    const { id } = useParams();
    const { selected } = useAppSelector(selectDepartment);
    const [openUploadImage, setUploadImage] = React.useState(false);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const { data: product, refetch } = useQuery({
        queryKey: [`load-product-detail-${id}-${selected}`],
        queryFn: () => productServices.getProductDetail(Number(id), selected).then((data)=> data.resultObj),
        enabled: !!id,
    });

    const { showBoundary } = useErrorBoundary();
    const { contextHolder, openNotification } = useNotification();
    const updateProduct = useMutation({
        mutationKey: ['update-product'],
        mutationFn: (body: Product) => productServices.updateProduct(body),
        onSuccess: (res) => {
            if (res.isSuccessed === true) {
                refetch();
                openNotification('success', 'Edit Product success');
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
        if (product != undefined) {
            values.id = product.id;
            updateProduct.mutateAsync(values);
        }
    };
    const onFinishFailed: FormProps<Product>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showDrawerVariation = () => {
        setOpenVariaton(true);
    };
    return (
        <div>
            {contextHolder}
            <div className="flex justify-between items-center mb-3">
                <GoBack />
                {product != undefined && (
                    <>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setUploadImage(true);
                                }}
                                icon={<PlusOutlined />}
                            >
                                Upload image
                            </Button>
                            <Button type="primary" onClick={showDrawerVariation} icon={<PlusOutlined />}>
                                Config Variation
                            </Button>
                        </Space>
                    </>
                )}
            </div>
            {product != undefined ? (
                <>
                    <ProductForm
                        data={product}
                        isLoading={updateProduct.isPending}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />

                    <ProductItemConfig product={product} refetch={refetch} productItem={product.items} />
                    <UploadImages open={openUploadImage} setOpen={setUploadImage} product={product} />
                    <VariationFrom product={product} open={openVariaton} onSetStateOpen={setOpenVariaton} />
                </>
            ) : (
                <Skeleton />
            )}
        </div>
    );
}

export default ProductEdit;

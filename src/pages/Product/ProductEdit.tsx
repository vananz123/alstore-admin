import ProductForm from '@/conponents/ProductForm';
import * as productServices from '@/api/productServices';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Skeleton, Space } from 'antd';
import { useAppSelector } from '@/app/hooks';
import { selectDepartment } from '@/app/feature/department/reducer';
import ProductItemConfig from './ProductItemConfig';
import UploadImages from '@/view/product/UploadImages';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import VariationFrom from '@/conponents/VariationForm';
import { useQuery } from '@tanstack/react-query';
function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selected } = useAppSelector(selectDepartment);
    const [openUploadImage, setUploadImage] = React.useState(false);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const { data: product, refetch } = useQuery({
        queryKey: [`load-product-detail-${id}-${selected}`],
        queryFn: () => productServices.getProductDetail(Number(id), selected),
        enabled: !!id,
    });
    const showDrawerVariation = () => {
        setOpenVariaton(true);
    };
    return (
        <div>
            <div className='flex justify-between items-center mb-3'>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    size="small"
                    style={{ marginBottom: '10px' }}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Quay lại
                </Button>
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
                    <ProductForm product={product} refetch={refetch} />

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

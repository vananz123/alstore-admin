import { Product, Variation } from '@/type';
import { Space, Modal, Typography } from 'antd';
const { Paragraph } = Typography;
import React from 'react';
interface Props {
    product: Product | undefined;
}
const ProductDetailInfo: React.FC<Props> = React.memo(({ product }) => {
    const [open, setOpenInfo] = React.useState(false);
    const handleCancel = () => {
        setOpenInfo(false);
    };
    return (
        <div>
            <div className='border-[2px] border-[#fafafa] rounded'>
                <div className='flex justify-between p-3 bg-[#fafafa] rounded'>
                    <p className='text-base font-bold'>Thông số</p>
                    <p
                        onClick={() => {
                            setOpenInfo(true);
                        }}
                        className="underline cursor-pointer"
                    >
                        Xem chi tiết
                    </p>
                </div>
                <div className='p-3 rounded'>
                {product?.variation !== undefined && (
                        <>
                            <div>
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                    className="product-card__title"
                                >
                                    {product?.variation.map((e: Variation) => (
                                        <p>
                                            {e.name} {e.value}
                                        </p>
                                    ))}
                                </Paragraph>
                            </div>
                            <div className="h-[40px]">
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: product.seoDescription }}></p>
                                </Paragraph>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal title="Thông số chi tiết" open={open} onCancel={handleCancel} footer={''}>
                <Space direction="vertical">
                    {product?.variation !== undefined && (
                        <>
                            {product?.variation.map((e: Variation) => (
                                <div>
                                    <p className="product-card__title">
                                        {e.name} {e.value}
                                    </p>
                                </div>
                            ))}
                            <p dangerouslySetInnerHTML={{ __html: product.seoDescription }}></p>
                        </>
                    )}
                </Space>
            </Modal>
        </div>
    );
});

export default ProductDetailInfo;

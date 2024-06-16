/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '@/type';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import * as productServices from '@/api/productServices';
import { Card, Typography } from 'antd';
import React from 'react';
import useProductViewerStore from '@/hooks/useProductViewerStore';
const { Paragraph } = Typography;
type ProductCardType = 'forCard' | 'forList';
interface Props {
    product: Product | undefined;
    type?: ProductCardType;
}
const ProductCard: React.FC<Props> = ({ product, type = 'forCard'}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {setProductViewer} = useProductViewerStore()
    const viewConut = async () => {
        if (typeof product !== 'undefined') {
            if(product) setProductViewer(product)
            await productServices.productViewCount(product?.id);
        }
    };
    return (
        <Link to={`/product/detail/${product?.id}`} onClick={() => viewConut()}>
            {type == 'forCard' ? (
                <>
                    <Card
                        className="product-card"
                        bordered={false}
                        hoverable
                        size="small"
                        cover={<img alt={product?.name} src={`${baseUrl + product?.urlThumbnailImage}`} />}
                    >
                        <div className="flex flex-col text-center justify-between h-full w-full">
                            <div className="h-[48px]">
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                    className="product-card__title"
                                >
                                    {product?.seoTitle}
                                </Paragraph>
                            </div>
                            {product?.type == undefined ? (
                                <div className="text-[14px] sm:text-[16px] text-center text-red-500 font-medium mr-[5px]">
                                    <span>{ChangeCurrence(product?.price)}</span>
                                </div>
                            ) : (
                                <div className="flex justify-center text-center flex-col md:flex-row">
                                    <div>
                                        <span className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                            {ChangeCurrence(product?.price)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] sm:text-[12px] text-[#6D6E72] font-medium mr-[5px] line-through">
                                            {ChangeCurrence(product?.priceBeforeDiscount)}
                                        </span>
                                        {product.type === 'fixed' ? (
                                            <span className="pro-percent"> -{product.valuePromotion}</span>
                                        ) : (
                                            <span className="text-[#E30019] text-[10px] sm:text-[12px] text-center rounded border-[1px] border-[#E30019] px-1">
                                                -{product.valuePromotion}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <span style={{ position: 'absolute', top: '5px', right: '5px' }}>
                            {product?.status === 2 && (
                                <Badge.Ribbon text="New" color="red"></Badge.Ribbon>
                            )}
                            {product?.status === 3 && (
                                <Badge.Ribbon text="Hot" color="yellow"></Badge.Ribbon>
                            )}
                        </span>
                    </Card>
                </>
            ) : (
                <div className='rounded p-2 bg-[#fafafa]'>
                    <div className="flex items-center gap-3">
                        <div className='w-[70px]'>
                            <img
                                className='w-full h-auto'
                                src={baseUrl + product?.urlThumbnailImage}
                            />
                        </div>
                        <div className='max-w-[250px]'>
                            <Paragraph
                                ellipsis={{
                                    rows: 2,
                                }}
                                className="product-card__title"
                            >
                                {product?.seoTitle}
                            </Paragraph>
                            {product?.type == undefined ? (
                                <div className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                    <span>{ChangeCurrence(product?.price)}</span>
                                </div>
                            ) : (
                                <div className="flex">
                                    <div>
                                        <span className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                            {ChangeCurrence(product?.price)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] sm:text-[12px] text-[#6D6E72] font-medium mr-[5px] line-through">
                                            {ChangeCurrence(product?.priceBeforeDiscount)}
                                        </span>
                                        {product.type === 'fixed' ? (
                                            <span className="pro-percent"> -{product.valuePromotion}</span>
                                        ) : (
                                            <span className="text-[#E30019] text-[10px] sm:text-[12px] text-center rounded border-[1px] border-[#E30019] px-1">
                                                -{product.valuePromotion}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Link>
    );
};
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formattedNumber;
    }
    return 0;
};
export default ProductCard;


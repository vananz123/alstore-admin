import { ProductItemSearch } from '@/type';
import { Typography } from 'antd';
import React from 'react';
const { Paragraph } = Typography;
const ProductItemCard: React.FC<{ productItem: ProductItemSearch }> = ({ productItem }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return (
        <div className="rounded p-2 bg-[#fafafa]">
            <div className="flex items-center gap-3">
                <div className="w-[70px]">
                    <img className="w-full h-auto" src={baseUrl + productItem?.urlThumbnailImage} />
                </div>
                <div className="max-w-[250px]">
                    <Paragraph
                        ellipsis={{
                            rows: 2,
                        }}
                        className="product-card__title"
                    >
                        {productItem?.seoTitle}
                    </Paragraph>
                    <div>
                        {productItem.value && (
                            <span>{`${productItem.name}: ${productItem.value}`}</span>
                        )}
                        
                    </div>
                    <div className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                        <span>{ChangeCurrence(productItem?.price)}</span>
                    </div>
                </div>
            </div>
        </div>
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
export default ProductItemCard;

import { useSkin } from '@/hooks';
import { ProductItemSearch } from '@/type';
import { Typography } from 'antd';
import React from 'react';
const { Paragraph } = Typography;
import { ChangeCurrence } from '@/utils/utils';
const ProductItemCard: React.FC<{ productItem: ProductItemSearch }> = ({ productItem }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { skin} = useSkin()
    return (
        <div className={`rounded p-2 ${skin === "light"? "bg-[#fafafa]": "bg-[#141414]"}`}>
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
export default ProductItemCard;

import { Image } from 'antd';
import React from 'react';
interface Props{
    listImage: string[];
    seo:string;
}
const ProductDetailImage: React.FC<Props> = React.memo(({ listImage,seo }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    return (
        <div>
            <div className='flex flex-col gap-2'>
            {listImage.map((e: string, index) => (
                    <div className='bg-[#fafafa] rounded' key={index}><Image style={{width:'100%'}} alt={`${seo}`} src={`${baseUrl + e}`} /></div>
                ))}
            </div>
        </div>
    );
});

export default ProductDetailImage;

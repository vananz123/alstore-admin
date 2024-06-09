import { Guaranty } from '@/type';
import { Modal, Space } from 'antd';
import React from 'react';
interface Props {
    guaranty: Guaranty | undefined;
}
const ProductDetailGuaranty: React.FC<Props> = React.memo(({ guaranty }) => {
    const [OpenGuaranty, setOpenGuaranty] = React.useState(false);
    const handleCancel = () => {
        setOpenGuaranty(false);
    };
    return (
        <div>
            <div className="border-[2px] border-[#fafafa] rounded">
                <div className='flex justify-between p-3 bg-[#fafafa] rounded'>
                    <p className='text-base font-bold'>Bảo Hành</p>
                    <p
                        onClick={() => {
                            setOpenGuaranty(true);
                        }}
                        className="underline cursor-pointer"
                    >
                        Xem chi tiết
                    </p>
                </div>
                <div className='p-3'>
                    {guaranty !== undefined && (
                        <>
                            {guaranty && (
                                <div className="product-card__title">
                                    Tên bảo hành: {guaranty.name} <br />
                                    Loại bảo hành: {guaranty.sku} <br />
                                    Thời hạn: {guaranty.period}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <Modal title="Thông số chi tiết" open={OpenGuaranty} onCancel={handleCancel} footer={''}>
                    <Space className="block">
                        {guaranty !== undefined && (
                            <>
                                {guaranty && (
                                    <div className="product-card__title">
                                        Tên bảo hành:{guaranty.name} <br />
                                        Loại bảo hành: {guaranty.sku} <br />
                                        Thời hạn: {guaranty.period}
                                    </div>
                                )}
                                <p dangerouslySetInnerHTML={{ __html: guaranty.description }}></p>
                            </>
                        )}
                    </Space>
                </Modal>
            </div>
        </div>
    );
});

export default ProductDetailGuaranty;

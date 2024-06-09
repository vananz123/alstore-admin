import type { Cart } from '@/api/ResType';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadCartDetail } from '@/app/feature/cart/action';
import { selectCartDetail } from '@/app/feature/cart/reducer';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {
    Typography,
    Alert,
    Avatar,
    Button,
    Col,
    Descriptions,
    Empty,
    InputNumber,
    Modal,
    Row,
    Space,
    Spin,
} from 'antd';
import React from 'react';
const { Paragraph } = Typography;
import * as cartServices from '@/api/cartServices';
import { Link } from 'react-router-dom';
import { selectUser } from '@/app/feature/user/reducer';
import Container from '@/conponents/Container';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;
function Cart() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser).data;
    const { isLoading, data } = useAppSelector(selectCartDetail);
    const [currentCart, setCurrentCart] = React.useState<Cart>();
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    console.log(data);
    const Navigate = useNavigate();
    const showModal = (cart: Cart) => {
        setOpen(true);
        setCurrentCart(cart);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(async () => {
            setOpen(false);
            if (currentCart != undefined) {
                const res = await cartServices.deleteCart(currentCart?.id);
                if (res.isSuccessed == true) {
                    dispatch(loadCartDetail({ userId: user?.id as string }));
                }
            }
            setConfirmLoading(false);
        }, 100);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const increase = async (e: Cart) => {
        if (typeof e !== 'undefined') {
            const newQuantity = e?.quantity + 1;
            if (newQuantity <= e?.stock) {
                const res = await cartServices.updateCart(e?.id, newQuantity);
                if (res.isSuccessed == true) dispatch(loadCartDetail({ userId: user?.id as string }));
            }
        }
    };
    const decline = async (e: Cart) => {
        if (typeof e !== 'undefined' && e.quantity > 0) {
            const newQuantity = e?.quantity - 1;
            const res = await cartServices.updateCart(e?.id, newQuantity);
            if (res.isSuccessed == true) {
                dispatch(loadCartDetail({ userId: user?.id as string }));
            }
        }
    };
    return (
        <Container>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    Navigate(-1);
                }}
            >
                Mua thêm sảm phẩm
            </Button>
            {data && (
                <>
                    <Spin spinning={isLoading}>
                        {data.items.length == 0 ? (
                            <>
                                <Empty imageStyle={{ height: 60 }}>
                                    <Link to={'/'}>
                                        <Button type="primary">Mua Hàng Ngay!</Button>
                                    </Link>
                                </Empty>
                            </>
                        ) : (
                            <>
                                <Row gutter={24}>
                                    <Col className="gutter-row" xs={24} md={24} lg={16} xl={16}>
                                        {data.items.map((e) => (
                                            <div className="rounded bg-[#fafafa] p-2 md:p-5 mb-3">
                                                <div className="flex justify-between">
                                                    <div className="w-[300px] md:w-full">
                                                        <Paragraph
                                                            ellipsis={{
                                                                rows: 1,
                                                            }}
                                                        >
                                                            <Link to={`/product/detail/${e.productId}`}>
                                                                {e.seoTitle}
                                                            </Link>
                                                        </Paragraph>
                                                    </div>
                                                    <div>
                                                        <Avatar
                                                            onClick={() => {
                                                                showModal(e);
                                                            }}
                                                            style={{
                                                                cursor: 'pointer',
                                                                backgroundColor: 'red',
                                                            }}
                                                            shape="square"
                                                            icon={<DeleteOutlined />}
                                                        ></Avatar>
                                                    </div>
                                                </div>
                                                <Row gutter={[8, 0]}>
                                                    <Col className="gutter-row" xs={6} lg={4}>
                                                        <div className="w-full h-full bg-white rounded">
                                                            <img
                                                                className="w-full"
                                                                src={`${baseUrl + e.urlThumbnailImage}`}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col className="gutter-row" xs={18} lg={20}>
                                                        <div className="w-full h-full sm:p-2">
                                                            <div className="h-full flex flex-col justify-between">
                                                                <div className="w-full">
                                                                    {e?.type == undefined ? (
                                                                        <div className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                                                            <span>
                                                                                {ChangeCurrence(e?.priceBeforeDiscount)}
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex flex-row">
                                                                            <div>
                                                                                <span className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                                                                    {ChangeCurrence(e?.price)}
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-[10px] sm:text-[12px] text-[#6D6E72] font-medium mr-[5px] line-through">
                                                                                    {ChangeCurrence(
                                                                                        e?.priceBeforeDiscount,
                                                                                    )}
                                                                                </span>
                                                                                {e.type === 'fixed' ? (
                                                                                    <span className="pro-percent">
                                                                                        {' '}
                                                                                        -{e.valuePromotion}
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="text-[#E30019] text-[10px] sm:text-[12px] text-center rounded border-[1px] border-[#E30019] px-1">
                                                                                        -{e.valuePromotion}%
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex justify-start gap-4">
                                                                    {e.name && (
                                                                        <>
                                                                            <p>
                                                                                {e?.name}: {e?.value} {e.sku}
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                    <div>
                                                                        <Space.Compact size="small">
                                                                            <Button
                                                                                onClick={() => {
                                                                                    decline(e);
                                                                                }}
                                                                                icon={<MinusOutlined />}
                                                                            />
                                                                            <InputNumber
                                                                                min={1}
                                                                                max={e?.stock}
                                                                                style={{ width: 50 }}
                                                                                value={e.quantity}
                                                                            />

                                                                            <Button
                                                                                onClick={() => {
                                                                                    increase(e);
                                                                                }}
                                                                                icon={<PlusOutlined />}
                                                                            />
                                                                        </Space.Compact>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold">
                                                                        Tổng: {ChangeCurrence(e?.total)}{' '}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <>
                                                                {e.stock == 0 && (
                                                                    <Alert
                                                                        type="error"
                                                                        message="Product out of stock! Please delete proudct"
                                                                    />
                                                                )}
                                                                {e.stock < e.quantity && (
                                                                    <Alert type="error" message="Product kh đủ!" />
                                                                )}
                                                            </>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                    </Col>
                                    <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
                                        <Descriptions title="Thông Tin Sản Phẩm" bordered column={1}>
                                            <Descriptions.Item label="Giá Sản Phẩm ">
                                                {ChangeCurrence(data.totalPriceBeforeDiscount)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Giá Giảm">
                                                {ChangeCurrence(data.totalDiscount)}
                                            </Descriptions.Item>
                                            <Descriptions.Item style={{ color: 'red' }} label="Giá Thanh Toán">
                                                {ChangeCurrence(data.totalPrice)}
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <Link to={`/purchase`}>
                                            <Button
                                                size="large"
                                                block
                                                type="primary"
                                                disabled={
                                                    data.items.length <= 0 ||
                                                    data.items.some((s) => s.stock == 0 || s.stock < s.quantity)
                                                }
                                                style={{ marginTop: 10 }}
                                            >
                                                Thanh Toán Ngay
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Spin>
                    <Modal
                        title="Notification"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        Do you want to detele!
                    </Modal>
                </>
            )}
        </Container>
    );
}
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
export default Cart;

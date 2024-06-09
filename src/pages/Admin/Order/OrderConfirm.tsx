import { Order, OrderDetail, OrderStatus, Review } from '@/api/ResType';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import * as orderServices from '@/api/orderServices';
import { Descriptions, Timeline, notification, Space, Popconfirm, Button, Table, TableColumnsType } from 'antd';
import { DescriptionsProps } from 'antd';
import dayjs from 'dayjs';
import ModalFeedback from '@/view/order/ModalFeedback';
import OrderWarranty from './OrderWarranty';
type NotificationType = 'success' | 'error';
type TimeLineProps = {
    label?: string;
    children: string;
};
function OrderConfirm() {
    const { id } = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [openModalFb, setOpenModalFb] = React.useState<boolean>(false);
    const [review, setReview] = React.useState<Review>();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };

    const [order, setOrder] = React.useState<Order>();
    const [statusTimeLine, setStatusTimeLine] = React.useState<TimeLineProps[]>([]);
    const desOrder: DescriptionsProps['items'] = [
        {
            key: 'address',
            label: 'Địa chỉ',
            children: (
                <>
                    <p>{order?.address?.phoneNumber}</p>
                    <p>
                        {order?.address?.streetNumber +
                            ', ' +
                            order?.address?.wardCommune +
                            ', ' +
                            order?.address?.urbanDistrict +
                            ', ' +
                            order?.address?.province}
                    </p>
                </>
            ),
            span: 1,
        },
        {
            key: 'paymentMethod',
            label: 'Loại Thanh Toán',
            children: `${order?.paymentMethod?.paymentType}`,
            span: 1,
        },
        {
            key: 'total',
            label: 'Tổng Tiền',
            children: `${ChangeCurrence(order?.orderTotal)}`,
        },
        {
            key: 'status',
            label: 'Trạng Thái',
            children: (
                <div>
                    <Timeline mode={'left'} items={statusTimeLine} />
                </div>
            ),
        },
    ];
    const desUser: DescriptionsProps['items'] = [
        {
            key: 'fullName',
            label: 'Tên Khách Hàng',
            children: `${order?.user.fullName}`,
        },
        {
            key: 'Email',
            label: 'Email',
            children: `${order?.user.email}`,
        },
        {
            key: 'Phone number',
            label: 'Số Điện Thoại',
            children: `${order?.user.phoneNumber}`,
        },
    ];
    const navigate = useNavigate();
    const [openConfrim, setOpenConfrim] = React.useState(false);
    const [openWarranty, setOpenWarranty] = React.useState(false);
    const [orderDetail, setOrderDetail] = React.useState<OrderDetail>();
    const [openCancel, setOpenCancel] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const showPopconfirmCancel = () => {
        setOpenCancel(true);
    };
    const showPopconfirm = () => {
        setOpenConfrim(true);
    };
    const handleOkCancel = async () => {
        setConfirmLoading(true);
        if (typeof order != 'undefined') {
            const res = await orderServices.canceled(order.id);
            if (res.isSuccessed === true) {
                openNotificationWithIcon('success', res.message);
                getOrderAdminByOrderId();
            } else {
                openNotificationWithIcon('error', res.message);
            }
        }
        setOpenConfrim(false);
        setConfirmLoading(false);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        if (typeof order != 'undefined') {
            const res = await orderServices.comfirm(order.id);
            if (res.isSuccessed === true) {
                openNotificationWithIcon('success', res.message);
                getOrderAdminByOrderId();
            } else {
                openNotificationWithIcon('error', res.message);
            }
        }
        setOpenConfrim(false);
        setConfirmLoading(false);
    };
    const getOrderAdminByOrderId = async () => {
        if (typeof id != 'undefined') {
            const res = await orderServices.getOrderAdminByOrderId(Number(id));
            if (res.isSuccessed === true) {
                setOrder(res.resultObj);
                const arr: TimeLineProps[] = [];
                res.resultObj.status?.forEach((element: OrderStatus) => {
                    const line: TimeLineProps = {
                        children: `${element.name}` + ' ' + dayjs(element.createAt).format('MM/DD/YYYY, HH:MM'),
                    };
                    arr.push(line);
                });
                setStatusTimeLine(arr);
            }
        }
    };
    useEffect(() => {
        getOrderAdminByOrderId();
    }, [id]);
    const columns: TableColumnsType<OrderDetail> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'seoTitle',
            dataIndex: 'seoTitle',
            key: 'seoTitle',
        },
        {
            title: 'Image',
            dataIndex: 'urlThumbnailImage',
            key: 'urlThumbnailImage',
            render: (_, record) => <img style={{ width: 70 }} src={baseUrl + record.urlThumbnailImage} />,
        },
        {
            title: 'Size',
            dataIndex: 'value',
            key: 'value',
            render: (_, record) => <p>{record.value === null ? 'not' : `${record.value} ${record.sku}`}</p>,
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => <p>{ChangeCurrence(record.price)}</p>,
        },
        {
            title: 'Bảo hành',
            dataIndex: 'guaranty',
            key: 'guaranty',
            render: (_, record) => (
                <div>
                    <p>{record.guaranty.name}</p>
                    <p>{record.guaranty.period + ' ' + record.guaranty.sku}</p>
                    <p>{dayjs(record.guaranty.datePeriod).format('MM/DD/YYYY')}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'review',
            key: 'review',
            render: (_, record) => (
                <>
                    <Space direction='vertical'>
                        <Button
                            disabled={record.review == null}
                            onClick={() => {
                                setReview(record.review);
                                setOpenModalFb(true);
                            }}
                        >
                            Phản hồi
                        </Button>
                        <Button
                            disabled={order?.status?.some(s => s.name === "Đã hoàn thành") ===false}
                            onClick={() => {
                                setOrderDetail(record);
                                setOpenWarranty(true);
                            }}
                        >
                            Bảo hành
                        </Button>
                    </Space>
                </>
            ),
        },
    ];
    return (
        <div>
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
            {contextHolder}
            <Descriptions
                title="Thông Tin Khách Hàng"
                column={3}
                size="middle"
                items={desUser}
                bordered
                extra={
                    <Space>
                        <Popconfirm
                            title="Xác nhận"
                            description="Thao táo này không thể hoàn tác!"
                            open={openConfrim}
                            onConfirm={handleOk}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={() => {
                                setOpenConfrim(false);
                            }}
                        >
                            <Button
                                disabled={order?.status?.some((s) => s.name == 'Đã tiếp nhận' || s.name === 'Đã hủy')}
                                onClick={() => {
                                    showPopconfirm();
                                }}
                            >
                                Confrim
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Xác nhận"
                            description="Thao táo này không thể hoàn tác!"
                            placement="bottomLeft"
                            open={openCancel}
                            onConfirm={handleOkCancel}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={() => {
                                setOpenCancel(false);
                            }}
                        >
                            <Button
                                danger
                                onClick={() => {
                                    showPopconfirmCancel();
                                }}
                            >
                                Cancel
                            </Button>
                        </Popconfirm>
                    </Space>
                }
            />
            <Descriptions title="Thông Tin Đơn Hàng" column={2} size="middle" items={desOrder} bordered />

            <Table
                title={() => <p>Order detail</p>}
                pagination={{ position: ['none'] }}
                columns={columns}
                dataSource={order?.orderDetail}
                rowKey={(record) => record.id}
            />
            <ModalFeedback openModalFb={openModalFb} review={review} setOpenModalFb={setOpenModalFb} />
            <OrderWarranty orderDetail={orderDetail} open={openWarranty} setOpen={setOpenWarranty} />
        </div>
    );
}
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default OrderConfirm;

import { OrderDetail, OrderStatus, Result, Review } from '@/api/ResType';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import * as orderServices from '@/api/orderServices';
import { Descriptions, Timeline, Space, Popconfirm, Button, Table, TableColumnsType, Spin } from 'antd';
import { DescriptionsProps } from 'antd';
import dayjs from 'dayjs';
import ModalFeedback from '@/view/order/ModalFeedback';
import OrderWarranty from './OrderWarranty';
import useNotification from '@/hooks/useNotification';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {  useErrorBoundary } from 'react-error-boundary';
import { useImmer } from 'use-immer';
import { columnsOrderConfirm } from './TableColumnsBase';
import { ChangeCurrence } from "@/utils/utils";
type TimeLineProps = {
    label?: string;
    children: string;
};
function OrderConfirm() {
    const { id } = useParams();
    const [openModalFb, setOpenModalFb] = useImmer<boolean>(false);
    const [review, setReview] = useImmer<Review | undefined>(undefined);
    const { contextHolder, openNotification } = useNotification();
    const statusTimeLine: TimeLineProps[] = [];
    const {
        data: order,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: [`load-order-detail`, id],
        queryFn: () => orderServices.getOrderAdminByOrderId(Number(id)),
        enabled: !!id,
    });
    if (order) {
        order.status?.forEach((element: OrderStatus) => {
            const line: TimeLineProps = {
                children: `${element.name}` + ' ' + dayjs(element.createAt).format('MM/DD/YYYY, HH:MM'),
            };
            statusTimeLine.push(line);
        });
    }
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
            key: 'shippingMethod',
            label: `Loại nhận hàng`,
            children: `${order?.shippingName}: ${order?.department ? order.department.name : ''}`,
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
    const [openWarranty, setOpenWarranty] = React.useState(false);
    const [orderDetail, setOrderDetail] = React.useState<OrderDetail>();

    const {showBoundary}= useErrorBoundary()
    const canceled = useMutation({
        mutationKey:['canceled'],
        mutationFn:(id:number)=> orderServices.canceled(id),
        onSuccess:((data)=> {
            if(data?.isSuccessed === true){
                refetch()
                openNotification('success', data.message);
            }
        }),
        onError:((error:AxiosError<Result>)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }else{
                openNotification('error', error.response?.data.message);
            }
        })
    })
    const confirmed = useMutation({
        mutationKey:['confirmed'],
        mutationFn:(id:number)=> orderServices.comfirm(id),
        onSuccess:((data)=> {
            if(data?.isSuccessed === true){
                refetch()
                openNotification('success', data.message);
            }
        }),
        onError:((error:AxiosError<Result>)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }else{
                openNotification('error', error.response?.data.message);
            }
        })
    })
    const successed = useMutation({
        mutationKey:['successed'],
        mutationFn:(id:number)=> orderServices.successed(id),
        onSuccess:((data)=> {
            if(data?.isSuccessed === true){
                refetch()
                openNotification('success', data.message);
            }
        }),
        onError:((error:AxiosError<Result>)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }else{
                openNotification('error', error.response?.data.message);
            }
        })
    })
    const columns: TableColumnsType<OrderDetail> = [
        ...columnsOrderConfirm,
        {
            title: 'Action',
            dataIndex: 'review',
            key: 'review',
            render: (_, record) => (
                <>
                    <Space direction="vertical">
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
                            disabled={order?.status?.some((s) => s.name === 'Đã hoàn thành') === false}
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
            <div className="flex justify-between">
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
                <div>
                    {order && (
                        <Space>
                            {order.isSuccsessedButton && (
                                <Popconfirm
                                    title="Xác nhận"
                                    description="Thao táo này không thể hoàn tác!"
                                    onConfirm={()=> successed.mutateAsync(order.id)}
                                    okButtonProps={{ loading: successed.isPending }}
                                >
                                    <Button
                                    >
                                        Hoàn thành
                                    </Button>
                                </Popconfirm>
                            )}
                            {order.isConfirmeddButton && (
                                <Popconfirm
                                    title="Xác nhận"
                                    description="Thao táo này không thể hoàn tác!"
                                    onConfirm={()=> confirmed.mutateAsync(order.id)}
                                    okButtonProps={{ loading: confirmed.isPending }}
                                >
                                    <Button
                                    >
                                        Xác nhận
                                    </Button>
                                </Popconfirm>
                            )}
                            {order.status?.some(s=> s.name ==="Đã hủy" || s.name ==="Đã hoàn thành" || s.name ==="Trả hàng") ===false && (
                                <Popconfirm
                                    title="Xác nhận"
                                    description="Thao táo này không thể hoàn tác!"
                                    placement="bottomLeft"
                                    onConfirm={()=> canceled.mutateAsync(order.id)}
                                    okButtonProps={{ loading: canceled.isPending }}
                                >
                                    <Button
                                        danger
                                        type="primary"
                                    >
                                        Hủy
                                    </Button>
                                </Popconfirm>
                            )}
                        </Space>
                    )}
                </div>
            </div>
            {contextHolder}
            <Spin spinning={isLoading}>
                <Descriptions title="Thông Tin Khách Hàng" column={3} size="middle" items={desUser} bordered />
                <Descriptions title="Thông Tin Đơn Hàng" column={2} size="middle" items={desOrder} bordered />
                <Table
                    title={() => <p>Order detail</p>}
                    pagination={{ position: ['none'] }}
                    columns={columns}
                    dataSource={order?.orderDetail}
                    rowKey={(record) => record.id}
                />
            </Spin>
            <ModalFeedback openModalFb={openModalFb} review={review} setOpenModalFb={setOpenModalFb} />
            <OrderWarranty orderDetail={orderDetail} open={openWarranty} setOpen={setOpenWarranty} />
        </div>
    );
}
export default OrderConfirm;

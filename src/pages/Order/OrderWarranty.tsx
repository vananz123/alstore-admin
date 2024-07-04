/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderDetail, Warranty } from '@/api/ResType';
import {  PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table, TableColumnsType, notification } from 'antd';
import * as warrantyServices from '@/api/warrantyServices';
import React, { SetStateAction } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import ModalWararrtyForm from './ModalWararrtyForm';
import dayjs from 'dayjs';
import { OPTIONS_STATUS_WARRANTY } from '@/common/common';
import StatusTag from '@/conponents/StatusTag';
interface Props {
    orderDetail: OrderDetail | undefined;
    open: boolean;
    setOpen: SetStateAction<any>;
}
type NotificationType = 'success' | 'error';
const OrderWarranty: React.FC<Props> = ({ open, setOpen, orderDetail }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const { data, isLoading, refetch } = useQuery({
        queryKey: [`load-warranty-${orderDetail?.id}`],
        queryFn: () => warrantyServices.getAllByOrderDetailId(orderDetail ? orderDetail.id : 0),
        enabled: !!orderDetail,
    });
    const [openForm, setOpenForm] = React.useState<boolean>(false);
    const [warranty, setWarranty] = React.useState<Warranty>();
    // const deleteWarranty = useMutation({
    //     mutationKey: ['delete-warranty'],
    //     mutationFn: (body: number) => warrantyServices.del(body),
    //     onSuccess: (data) => {
    //         if (data.isSuccessed === true) {
    //             refetch();
    //             openNotificationWithIcon('success', 'thành công');
    //         } else {
    //             openNotificationWithIcon('error', data.message);
    //         }
    //     },
    // });
    const canceledWarranty = useMutation({
        mutationKey: ['cancele-warranty'],
        mutationFn: (body: number) => warrantyServices.canceled(body),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotificationWithIcon('success', 'thành công');
            } else {
                openNotificationWithIcon('error', data.message);
            }
        },
    });
    const successedWarranty = useMutation({
        mutationKey: ['successed-warranty'],
        mutationFn: (body: number) => warrantyServices.successed(body),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotificationWithIcon('success', 'thành công');
            } else {
                openNotificationWithIcon('error', data.message);
            }
        },
    });
    const columns: TableColumnsType<Warranty> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render:(_,record)=>(
                <StatusTag status={record.status} options={OPTIONS_STATUS_WARRANTY}/>
            )
        },
        {
            title: 'dateCreated',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            render: (_, record) => (
                <div>
                    <p>{dayjs(record.dateCreated).format('MM/DD/YYYY')}</p>
                </div>
            ),
        },
        {
            title: 'dateModify',
            dataIndex: 'dateModify',
            key: 'dateModify',
            render: (_, record) => (
                <div>
                    <p>{dayjs(record.dateModify).format('MM/DD/YYYY')}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'status',
            render: (_, record) => (
                <>
                    <Space direction="vertical">
                        <Button
                            loading={canceledWarranty.isPending}
                            disabled={record.isCanceledButton == false}
                            onClick={async () => {
                                canceledWarranty.mutateAsync(record.id);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            loading={successedWarranty.isPending}
                            disabled={record.isSuccessedButton == false}
                            onClick={async () => {
                                successedWarranty.mutateAsync(record.id);
                            }}
                        >
                            Hoàn thành
                        </Button>
                        <Button
                            onClick={() => {
                                setWarranty(record);
                                setOpenForm(true);
                            }}
                        >
                            Sửa
                        </Button>
                        {/* <Button
                            loading={deleteWarranty.isPending}
                            onClick={async () => {
                                deleteWarranty.mutateAsync(record.id);
                            }}
                        >
                            Xóa
                        </Button> */}
                    </Space>
                </>
            ),
        },
    ];

    return (
        <div>
            {contextHolder}
            <Modal
                confirmLoading={isLoading}
                width={800}
                title="Lịch sử bảo hành"
                open={open}
                onCancel={() => setOpen(false)}
                footer=""
            >
                <Button type="primary" onClick={() => {
                    setWarranty(undefined)
                    setOpenForm(true)
                }} icon={<PlusOutlined />} size="large">
                    Thêm
                </Button>
                {data && <Table dataSource={data} columns={columns} />}
            </Modal>
            <ModalWararrtyForm open={openForm} setOpen={setOpenForm} orderDetail={orderDetail} warranty={warranty} refresh={refetch}/>
        </div>
    );
};

export default OrderWarranty;

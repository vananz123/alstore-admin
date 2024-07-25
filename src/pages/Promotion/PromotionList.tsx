import { Table, Space, Modal, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import { getAllPromotion, DeletaPromotion } from '@/api/promotionServices';
import React from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { Promotion, Result } from '@/api/ResType';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useImmer } from 'use-immer';
import useNotification from '@/hooks/useNotification';
import { AxiosError } from 'axios';
import { OPTIONS_STATUS, PAPINATION } from '@/common/common';
import { isAxiosBadRequestError, isAxiosUnauthoriedError } from '@/utils/utils';
import StatusTag from '@/conponents/StatusTag';
import dayjs from 'dayjs';
function PromotionList() {
    const [open, setOpen] = React.useState(false);
    const [context, setContext] = useImmer<{ currentId: number; textContent: string }>({
        currentId: 0,
        textContent: 'Những sản đã áp dụng mã này sẽ được gỡ',
    });
    const { getColumnSearchProps } = useSearchIndexTable();
    const { data, refetch } = useQuery({
        queryKey: ['load-promotion'],
        queryFn: () => getAllPromotion().then((data) => data.resultObj),
    });
    const columns: TableProps<Promotion>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Loại Khuyến mãi',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps<Promotion>('name'),
        },
        {
            title: 'Phần Trăm Giảm',
            dataIndex: 'discountRate',
            key: 'name',
            render: (_, record) => <p>{record.value}%</p>,
        },
        {
            title: 'Ngày Bắt Đầu',
            dataIndex: 'startDate',
            key: 'name',
            render: (_, record) => <p>{dayjs(record.startDate).format('MM/DD/YYYY')}</p>,
        },
        {
            title: 'Ngày Kết Thúc',
            dataIndex: 'endDate',
            key: 'name',
            render: (_, record) => <p>{dayjs(record.endDate).format('MM/DD/YYYY')}</p>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <StatusTag status={record.status} options={OPTIONS_STATUS} />,
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/promotion/edit/${record.id}`}>
                        <EditOutlined />{' '}
                    </Link>
                    <a onClick={() => showModalDel(record.id)}>
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number) => {
        setContext((draft) => {
            draft.currentId = id;
        });
        setOpen(true);
    };
    const { contextHolder, openNotification } = useNotification();
    const del = useMutation({
        mutationKey: ['del-promotion', context.currentId],
        mutationFn: (id: number) => DeletaPromotion(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                setOpen(false);
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (isAxiosUnauthoriedError(error)) {
                //
            }
            if (isAxiosBadRequestError(error)) {
                setOpen(false);
                openNotification('success', error.response?.data.message);
            }
        },
    });
    const handleOkDel = () => {
        if (context.currentId !== 0) del.mutateAsync(context.currentId);
    };
    return (
        <div>
            {contextHolder}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="end">
                    <Space>
                        <Link to={'/promotion/add'}>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Thêm
                            </Button>
                        </Link>
                        <Button icon={<ReloadOutlined />}></Button>
                    </Space>
                </Flex>
                <Table pagination={PAPINATION} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Xóa khuyến mãi"
                open={open}
                onOk={handleOkDel}
                confirmLoading={del.isPending}
                onCancel={() => setOpen(false)}
            >
                <p>{context.textContent}</p>
            </Modal>
        </div>
    );
}

export default PromotionList;

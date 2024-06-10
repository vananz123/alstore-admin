import { Table, Space, Modal, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import * as promotionServices from '@/api/promotionServices';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { Promotion } from '@/api/ResType';

function PromotionList() {
    const [data, setData] = React.useState<Promotion[]>();
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context, setContext] = React.useState<string>('OK');

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
            render: (_, record) => <p>{new Date(record.startDate).toUTCString()}</p>,
        },
        {
            title: 'Ngày Kết Thúc',
            dataIndex: 'endDate',
            key: 'name',
            render: (_, record) => <p>{new Date(record.endDate).toUTCString()}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/promotion-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number, name: string) => {
        setModalText(`Bạn muốn xóa ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const getAllPromotion = async () => {
        const res = await promotionServices.getAllPromotion();
        setData(res);
    };
    useEffect(() => {
        getAllPromotion();
    }, []);
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setContext('');
        setTimeout(async () => {
            const res = await promotionServices.DeletaPromotion(currentId)
            if (res.isSuccessed === true) {
                getAllPromotion()
                setOpen(false);
                setConfirmLoading(false);
            } else {
                setModalText('error!');
                setConfirmLoading(false);
                setContext('OK')
            }
        }, 300);
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/promotion-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                    {/* <SearchC typeSearch={2} onSetState={setData} /> */}
                </Flex>
                <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                okText={context}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
}

export default PromotionList;

import { Table, Space, Modal, Button, Flex, Select } from 'antd';
import type { TableColumnsType } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Category } from '@/type';
import { OPTIONS_STATUS } from '@/common/common';
function CategoriesList() {
    const [data, setData] = React.useState<Category[]>();
    const [currentId, setCurrentId] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context, setContext] = React.useState<string>('OK');
    const columnss: TableColumnsType<Category> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render:(_,record)=>(
                <Select value={record.status} disabled options={OPTIONS_STATUS}/>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/category-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id.toString(), record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const columns: TableColumnsType<Category> = [
        Table.EXPAND_COLUMN,
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',render:(_,record)=>(
                <Select value={record.status} disabled options={OPTIONS_STATUS}/>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/category-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id.toString(), record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const loadAllCate = async () => {
        const res = await categoryServices.getAllAdminCate("sub");
        if (res.isSuccessed == true) {
            setData(res.resultObj)
        }
    };
    
    useEffect(() => {
        loadAllCate();
    }, [data]);
    const showModalDel = (id: string, name: string) => {
        setModalText(`Do you want category ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setContext('');
        setTimeout(async () => {
            const res = await categoryServices.deleteCate(currentId);
            if (res.statusCode == 204) {
                loadAllCate()
                setOpen(false);
                setConfirmLoading(false);
            } else {
                setModalText('error!');
                setConfirmLoading(false);
                setContext('OK');
            }
        }, 500);
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/admin/category-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                </Flex>
                <Table
                    rowKey={(record) => record.id}
                    pagination={{ position: ['bottomLeft'], pageSize: 4 }}
                    columns={columns}
                    dataSource={data}
                    expandable={{
                    expandedRowRender:(recore)=>{
                        return <Table rowKey={(recore)=> recore.id} columns={columnss} dataSource={recore.subCategory}/>
                    }
                }}
                />
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

export default CategoriesList;

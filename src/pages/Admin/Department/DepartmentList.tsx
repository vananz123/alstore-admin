import React from 'react';
import { Department } from '@/type';
import { TableProps, Space, Modal, Flex, Button,Table } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import * as departmentServices from '@/api/departmentServices';
import { useEffect } from 'react';

function DepartmentList() {
    const [data, setData] = React.useState<Department[]>();
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context, setContext] = React.useState<string>('OK');

    const columns: TableProps<Department>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Tên Chi Nhánh',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/departments-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number, name: string) => {
        setModalText(`Do you want department ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const getAllDepartment = async () => {
        const res = await departmentServices.getAllDepartment();
        console.log(res);
        if (res.isSuccessed === true) {
            setData(res.resultObj);
        }
    };
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setContext('');
        setTimeout(async () => {
            const res = await departmentServices.deleteDepartment(currentId);
            if (res.isSuccessed === true) {
                getAllDepartment();
                setOpen(false);
                setConfirmLoading(false);
                setModalText('success');
                setContext('OK');
            } else {
                setModalText('error!');
                setConfirmLoading(false);
                setContext('OK');
            }
        }, 300);
    };
    useEffect(() => {
        //load api voo dday
        getAllDepartment();
    }, []);
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/departments-add'}>
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
export default DepartmentList;

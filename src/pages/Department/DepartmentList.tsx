import React from 'react';
import { Department } from '@/type';
import { TableProps, Space, Modal, Flex, Button,Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import * as departmentServices from '@/api/departmentServices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { OPTIONS_STATUS } from '@/common/common';
function DepartmentList() {
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context, setContext] = React.useState<string>('OK');
    const { isLoading, data , refetch} = useQuery({
        queryKey:['load-departments'],
        queryFn:()=>  departmentServices.getAllDepartment().then((data) => data.resultObj)
    })
    const deleteDepartment = useMutation({
        mutationKey:[`delete-depaerment-${currentId}`],
        mutationFn:(id:number)=> departmentServices.deleteDepartment(id),
        onSuccess:(data)=>{
            if(data.isSuccessed === true){
                refetch()
            }
        }
    })
    const renderTag = (status:number)=>{
        const option = OPTIONS_STATUS?.find(x => x.value == status)
        return <Tag color={option?.color}>{option?.label}</Tag>
    }
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
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render:(_,record)=>(
                renderTag(record.status)
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/department/edit/${record.id}`}>Edit</Link>
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
    const handleOkDel = () => {
        setModalText('deleting!');
        setContext('');
        deleteDepartment.mutate(currentId)
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/department/add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                    {/* <SearchC typeSearch={2} onSetState={setData} /> */}
                </Flex>
                <Table loading={isLoading} pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={deleteDepartment.isPending}
                onCancel={() => setOpen(false)}
                okText={context}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
}
export default DepartmentList;

import { Button, Table, Tag } from 'antd';
import type {  TableColumnsType } from 'antd';
import * as userServices from '@/api/userServices';
import { ResponseUser } from '@/api/ResType';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
function UserList() {
    const Navigate = useNavigate();
    const {getColumnSearchProps} = useSearchIndexTable()
    //search
    //product search
    const { data , isLoading } = useQuery({
        queryKey: ['load-user-list'],
        queryFn: () => userServices.getAllUserForAdmin(),
    });
    const columns: TableColumnsType<ResponseUser> = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'name',
        },
        {
            title: 'Họ Tên',
            dataIndex: 'fullName',
            key: 'name',
            ...getColumnSearchProps<ResponseUser>('fullName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
            ...getColumnSearchProps<ResponseUser>('email'),
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'name',
            ...getColumnSearchProps<ResponseUser>('phoneNumber'),
        },
        {
            title: 'Role',
            dataIndex: 'roleVm',
            key: 'roleVm',
            render: (_, record) => (
                <>
                    {record.roleVm.map((e) => (
                        <Tag color='green'>{e.name}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'Action',
            render: (_, record) => (
                <Button
                    onClick={() => {
                        Navigate(`/user/edit/${record.id}`);
                    }}
                    icon={<EditOutlined />}
                >
                    Edit
                </Button>
            ),
        },
    ];
    return (
        <div>
            <Table loading={isLoading} pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
        </div>
    );
}

export default UserList;

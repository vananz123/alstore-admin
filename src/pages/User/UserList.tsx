/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import * as userServices from '@/api/userServices';
import { ResponseUser } from '@/api/ResType';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { FILTERS_ROLES, PAPINATION } from '@/common/common';
import { EditOutlined } from '@ant-design/icons';
function UserList() {
    const { getColumnSearchProps } = useSearchIndexTable();
    const { data, isLoading } = useQuery({
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
                        <Tag color="green">{e.name}</Tag>
                    ))}
                </>
            ),
            filters: FILTERS_ROLES,
            onFilter: (value: any, record: ResponseUser) => record.roleVm.some((x) => x.name === value) === true,
        },
        {
            dataIndex: '',
            key: 'Action',
            render: (_, record) => <Link to={`/user/edit/${record.id}`}><EditOutlined/></Link>,
        },
    ];
    return (
        <div>
            <Table loading={isLoading} pagination={PAPINATION} columns={columns} dataSource={data} />
        </div>
    );
}

export default UserList;

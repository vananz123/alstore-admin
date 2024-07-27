/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import * as userServices from '@/api/userServices';
import { ResponseUser } from '@/api/ResType';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { FILTERS_ROLES, PAPINATION } from '@/common/common';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import Search, { SearchProps } from 'antd/es/input/Search';
import useQueryString from '@/hooks/useQueryString';
function UserList() {
    const { getColumnSearchProps } = useSearchIndexTable();
    const { queryString, setQueryString, removeQueryString } = useQueryString();
    const pagingRequest = {
        keyword: queryString.keyword,
        page: Number(queryString.page) || 1,
        pageSize: 10,
    };
    const { data, isLoading } = useQuery({
        queryKey: ['load-user-list', pagingRequest],
        queryFn: () => userServices.getAllUserForAdmin(pagingRequest).then((data) => data.resultObj),
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
            render: (_, record) => (
                <Link to={`/user/edit/${record.id}`}>
                    <EditOutlined />
                </Link>
            ),
        },
    ];
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            if (value && value != '') {
                removeQueryString('page');
                setQueryString('keyword', value);
            }
        }
        if (info?.source == 'clear') {
            removeQueryString('page');
            removeQueryString('keyword');
        }
    };
    return (
        <div>
            <Space direction='vertical'  style={{ width: '100%' }}>
                <Flex justify='space-between'>
                    <Search
                        className="max-w-[400px]"
                        allowClear
                        enterButton
                        defaultValue={queryString.keyword || ''}
                        placeholder="Từ khóa"
                        onSearch={onSearch}
                    />
                    <Space>
                        {/* <Link to={'/product/add'}>
                                    <Button type="primary" icon={<PlusOutlined />}>
                                        Thêm
                                    </Button>
                                </Link> */}
                        <Button icon={<ReloadOutlined />}></Button>
                    </Space>
                </Flex>
                <Table
                    loading={isLoading}
                    pagination={{
                        ...PAPINATION,
                        current: Number(queryString.page) || 1,
                        onChange: (page) => {
                            setQueryString('page', page.toString());
                        },
                        total:data?.totalRecords
                    }}
                    columns={columns}
                    dataSource={data?.items}
                />
            </Space>
        </div>
    );
}

export default UserList;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inventory } from '@/api/ResType';
import * as inventoryServices from '@/api/inventoryServices';
import { OPTIONS_TYPE_INVENTORY, OPTIONS_STATUS_INVENTORY, PAPINATION } from '@/common/common';
import useQueryString from '@/hooks/useQueryString';
import { DiffOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Space, Table, TableColumnsType, Tag } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
function HistoryInventory() {
    const { queryString, setQueryString } = useQueryString();
    const pagingRequest = {
        page: Number(queryString.page) || 1,
        pageSize: 10,
    };
    const { data: listInventoty } = useQuery({
        queryKey: [`load-his-inventory`, pagingRequest],
        queryFn: () => inventoryServices.getAllInventory(pagingRequest).then((data) => data.resultObj),
    });
    const renderTag = (status: number) => {
        const option = OPTIONS_STATUS_INVENTORY?.find((x) => x.value == status);
        return <Tag color={option?.color}>{option?.label}</Tag>;
    };
    const columns: TableColumnsType<Inventory> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
            filters: OPTIONS_TYPE_INVENTORY,
            onFilter: (value: any, record: Inventory) => record.type === value,
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: 'dateCreate',
            dataIndex: 'dateCreate',
            render: (_, record) => <p>{dayjs(record.dateCreate).format('MM/DD/YYYY')}</p>,
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => renderTag(record.status),
        },
        {
            key: 'action',
            render: (_, record) => <Link to={`/translation/${record.id}`}><EyeOutlined/></Link>,
        },
    ];
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="end" gap={5}>
                    <Link to={'/translation/import'}>
                        <Button type="primary" icon={<DiffOutlined />}>
                            Nhập hàng
                        </Button>
                    </Link>
                    <Link to={'/translation/export'}>
                        <Button type="primary" icon={<DiffOutlined />}>
                            Chuyển hàng
                        </Button>
                    </Link>
                    <Button icon={<ReloadOutlined />}></Button>
                </Flex>
                <Table
                    columns={columns}
                    pagination={{
                        ...PAPINATION,
                        current: Number(queryString.page) || 1,
                        onChange: (page) => {
                            setQueryString('page', page.toString());
                        },
                        total: listInventoty?.totalRecords,
                    }}
                    dataSource={listInventoty?.items}
                />
            </Space>
        </div>
    );
}

export default HistoryInventory;

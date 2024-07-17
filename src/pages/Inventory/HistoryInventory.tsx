/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inventory } from '@/api/ResType';
import * as inventoryServices from '@/api/inventoryServices';
import { OPTIONS_TYPE_INVENTORY  , OPTIONS_STATUS_INVENTORY} from '@/common/common';
import { DiffOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Space, Table, TableColumnsType, Tag } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
function HistoryInventory() {
    const { data: listInventoty } = useQuery({
        queryKey: [`load-his-inventory`],
        queryFn: () => inventoryServices.getAllInventory(),
    });
    const renderTag = (status:number)=>{
        const option = OPTIONS_STATUS_INVENTORY?.find(x => x.value == status)
        return <Tag color={option?.color}>{option?.label}</Tag>
    }
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
            filters:OPTIONS_TYPE_INVENTORY,
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
            render:(_,record)=>(
                renderTag(record.status)
            )
        },
        {
            title: 'Action',
            key: 'action',
            render:(_,record)=>(
                <Link to={`/translation/${record.id}`}>View</Link>
            )
        },
    ];
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify='start' gap={5}>
                    <Link to={'/translation/import'}>
                        <Button type="primary" icon={<DiffOutlined />} size="large">
                            Nhập hàng
                        </Button>
                    </Link>
                    <Link to={'/translation/export'}>
                        <Button type="primary" icon={<DiffOutlined />} size="large">
                            Chuyển hàng
                        </Button>
                    </Link>
                </Flex>
                <Table columns={columns} dataSource={listInventoty} />
            </Space>
           
        </div>
    );
}

export default HistoryInventory;

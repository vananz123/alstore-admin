import { Inventory } from '@/api/ResType';
import * as inventoryServices from '@/api/inventoryServices';
import { useQuery } from '@tanstack/react-query';
import { Table, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
function HistoryInventory() {
    const { data: listInventoty } = useQuery({
        queryKey: [`load-his-inventory`],
        queryFn: () => inventoryServices.getAllInventory(),
    });
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
        },
        {
            title: 'Action',
            key: 'action',
            render:(_,record)=>(
                <Link to={`/translation/inventory/${record.id}`}>View</Link>
            )
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={listInventoty} />
        </div>
    );
}

export default HistoryInventory;

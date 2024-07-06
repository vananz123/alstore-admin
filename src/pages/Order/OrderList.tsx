/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderStatus } from '@/api/ResType';
import { Table, Space, Badge, Tabs } from 'antd';
import type { TableColumnsType } from 'antd';
import { selectOrderStatus ,changeOrderStatus} from '@/app/feature/order-status/reducer';
import * as orderServices from '@/api/orderServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { PAPINATION, STATUS_ORDER } from '@/common/common';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectDepartment } from '@/app/feature/department/reducer';
import {OPTIONS_SHIPPING} from "@/common/common"
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { ChangeCurrence } from '@/utils/utils';
const items = [
    ...STATUS_ORDER,
    {
        key: 'All',
        label: 'All',
    },
];
function OrderList() {
    const dispatch  = useAppDispatch()
    const {name:statusName} = useAppSelector(selectOrderStatus);
    const {selected } = useAppSelector(selectDepartment)
    const {getColumnSearchProps} = useSearchIndexTable()
    const { data, isLoading } = useQuery({
        queryKey: [`load-user-order-list-${statusName}-${selected}`],
        queryFn: () => orderServices.getOrderAdmin(statusName , selected),
        enabled: !!statusName && !!selected,
    });
    const columns: TableColumnsType<Order> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps<Order>('email')
        },
        {
            title: 'Tổng Tiền Hóa Đơn',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (_, record) => <p>{ChangeCurrence(record.orderTotal)}</p>,
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (_, record) => <p>{dayjs(record.orderDate).format('MM/DD/YYYY, HH:mm')}</p>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <Badge status="processing" text={getLateArray(record.status)} />,
        },{
            title: 'Nhận hàng',
            dataIndex: 'shippingName',
            key: 'shippingName',
            render: (_, record) => <Badge status="processing" text={record.shippingName} />,
            filters: OPTIONS_SHIPPING,
            onFilter: (value: any, record: Order) => record.shippingName === value,
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link key={`a-${record.id}`} to={`/order/detail/${record.id}`}>
                        Xem
                    </Link>
                </Space>
            ),
        },
    ];
    const onChange = (key: string | undefined) => {

        if (key) dispatch( changeOrderStatus(key));
    }
    return (
        <div>
            <Tabs
                activeKey={statusName}
                items={items}
                onChange={onChange}
                indicator={{
                    size: (origin) => origin - 20,
                }}
            />
            <Table
                loading={isLoading}
                pagination={{ ...PAPINATION, total: data?.totalRecords }}
                columns={columns}
                dataSource={data?.items}
            />
        </div>
    );
}
const getLateArray = (os: OrderStatus[] | undefined) => {
    if (os && os.length > 0) {
        return os[os.length - 1].name;
    }
    return 'error';
};
export default OrderList;

import {  OrderDetail, Warranty } from "@/api/ResType";
import { TableColumnsType } from "antd";
import dayjs from "dayjs";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { ChangeCurrence } from "@/utils/utils";
export const columnsOrderConfirm: TableColumnsType<OrderDetail> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'seoTitle',
        dataIndex: 'seoTitle',
        key: 'seoTitle',
    },
    {
        title: 'Image',
        dataIndex: 'urlThumbnailImage',
        key: 'urlThumbnailImage',
        render: (_, record) => <img style={{ width: 70 }} src={baseUrl + record.urlThumbnailImage} />,
    },
    {
        title: 'Size',
        dataIndex: 'value',
        key: 'value',
        render: (_, record) => <p>{record.value === null ? 'not' : `${record.value} ${record.sku}`}</p>,
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
        render: (_, record) => <p>{ChangeCurrence(record.price)}</p>,
    },
    {
        title: 'Bảo hành',
        dataIndex: 'guaranty',
        key: 'guaranty',
        render: (_, record) => (
            <div>
                <p>{record.guaranty.name}</p>
                <p>{record.guaranty.period + ' ' + record.guaranty.sku}</p>
                <p>{dayjs(record.guaranty.datePeriod).format('MM/DD/YYYY')}</p>
            </div>
        ),
    },
];
export const columnsWarranty: TableColumnsType<Warranty> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'dateCreated',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        render: (_, record) => (
            <div>
                <p>{dayjs(record.dateCreated).format('MM/DD/YYYY')}</p>
            </div>
        ),
    },
    {
        title: 'dateModify',
        dataIndex: 'dateModify',
        key: 'dateModify',
        render: (_, record) => (
            <div>
                <p>{dayjs(record.dateModify).format('MM/DD/YYYY')}</p>
            </div>
        ),
    },
];

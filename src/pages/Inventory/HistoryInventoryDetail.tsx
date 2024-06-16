import { useNavigate, useParams } from 'react-router-dom';
import * as inventoryServices from '@/api/inventoryServices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Descriptions, DescriptionsProps, Popconfirm, Table, TableColumnsType } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { InventoryDetail } from '@/api/ResType';
import dayjs from 'dayjs';
import useNotification from '@/hooks/useNotification';
import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';
function HistoryInventoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { data: inventoty } = useQuery({
        queryKey: [`load-his-inventory-${id}`],
        queryFn: () => inventoryServices.getById(id ? Number(id) : 0),
        enabled: !!id,
    });
    console.log(inventoty);
    const { contextHolder, openNotification } = useNotification();
    const { showBoundary } = useErrorBoundary();
    const successed = useMutation({
        mutationKey: ['i-successed'],
        mutationFn: (id: number) => inventoryServices.successed(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                openNotification('success', data.message);
            } else {
                openNotification('error', data.message);
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 403) showBoundary(error);
        },
    });
    const canceled = useMutation({
        mutationKey: ['i-canceled'],
        mutationFn: (id: number) => inventoryServices.canceled(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                openNotification('success', data.message);
            } else {
                openNotification('error', data.message);
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 403) showBoundary(error);
        },
    });
    const desInventory: DescriptionsProps['items'] = [
        {
            key: 'Type',
            label: 'Type',
            children: inventoty?.type,
            span: 1,
        },
        {
            key: 'departmentName',
            label: 'Chi nhánh',
            children: inventoty?.departmentName,
            span: 1,
        },
        {
            key: 'paymentMethod',
            label: 'Ngày tạo',
            children: `${dayjs(inventoty?.dateCreate).format('MM/DD/YYYY')}`,
            span: 1,
        },
        {
            key: 'status',
            label: 'Trạng Thái',
            children: inventoty?.status,
        },
    ];
    const columns: TableColumnsType<InventoryDetail> = [
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
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => <p>{ChangeCurrence(record.price)}</p>,
        },
    ];
    return (
        <div>
            {contextHolder}
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    navigate(-1);
                }}
            >
                Quay lại
            </Button>
            <div className="flex justify-end gap-3">
                <Popconfirm
                    title="Xóa"
                    okButtonProps={{ loading: successed.isPending }}
                    onConfirm={() => {
                        if (inventoty) successed.mutateAsync(inventoty.id);
                    }}
                >
                    <Button>Xác nhận</Button>
                </Popconfirm>

                <Popconfirm
                    title="Xóa"
                    okButtonProps={{ loading: canceled.isPending }}
                    onConfirm={() => {
                        if (inventoty) canceled.mutateAsync(inventoty.id);
                    }}
                >
                    <Button>Hủy</Button>
                </Popconfirm>
            </div>
            <Descriptions title="Thông Tin Đơn Hàng" column={2} size="middle" items={desInventory} bordered />

            <Table
                title={() => <p>inventory detail</p>}
                pagination={{ position: ['none'] }}
                columns={columns}
                dataSource={inventoty?.items}
            />
        </div>
    );
}
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default HistoryInventoryDetail;

import { Link, useNavigate, useParams } from 'react-router-dom';
import * as inventoryServices from '@/api/inventoryServices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Descriptions, DescriptionsProps, Popconfirm, Space, Spin, Table, TableColumnsType, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { InventoryDetail, Result } from '@/api/ResType';
import dayjs from 'dayjs';
import useNotification from '@/hooks/useNotification';
import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';
import { OPTIONS_STATUS_INVENTORY } from '@/common/common';
import { ChangeCurrence } from '@/utils/utils';
function HistoryInventoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {
        data: inventoty,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [`load-his-inventory`,id],
        queryFn: () => inventoryServices.getById(Number(id)).then((data)=> data.resultObj),
        enabled: !!id,
    });
    const { contextHolder, openNotification } = useNotification();
    const { showBoundary } = useErrorBoundary();
    const successed = useMutation({
        mutationKey: ['i-successed'],
        mutationFn: (id: number) => inventoryServices.successed(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (error.response?.status === 403) {
                showBoundary(error);
            } else {
                openNotification('error', error.response?.data.message);
            }
        },
    });
    const canceled = useMutation({
        mutationKey: ['i-canceled'],
        mutationFn: (id: number) => inventoryServices.canceled(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (error.response?.status === 403) {
                showBoundary(error);
            } else {
                openNotification('error', error.response?.data.message);
            }
        },
    });
    const renderTag = (status: number) => {
        const option = OPTIONS_STATUS_INVENTORY?.find((x) => x.value == status);
        return <Tag color={option?.color}>{option?.label}</Tag>;
    };
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
            children: <>{inventoty && renderTag(inventoty?.status)}</>,
        },
    ];
    const columns: TableColumnsType<InventoryDetail> = [
        {
            title: 'Id',
            dataIndex: 'productItemId',
            key: 'productItemId',
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
            <div className="flex justify-between gap-3">
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
                <div>
                    {inventoty?.type ==='import' && (
                        <Link to={`/translation/export/${id}`}><Button type='primary' >Chuyển hàng</Button></Link>
                    )}
                    {inventoty?.type === 'export' && (
                        <>
                            <Space>
                                {}
                                <Popconfirm
                                    title="Xóa"
                                    okButtonProps={{ loading: successed.isPending }}
                                    onConfirm={() => {
                                        if (inventoty) successed.mutateAsync(inventoty.id);
                                    }}
                                >
                                    <Button loading={successed.isPending} disabled={inventoty.status === 1 || inventoty.status === 2}>
                                        Xác nhận
                                    </Button>
                                </Popconfirm>

                                <Popconfirm
                                    title="Xóa"
                                    okButtonProps={{ loading: canceled.isPending }}
                                    onConfirm={() => {
                                        if (inventoty) canceled.mutateAsync(inventoty.id);
                                    }}
                                >
                                    <Button
                                    loading={canceled.isPending}
                                        disabled={inventoty.status === 1 || inventoty.status === 2}
                                        danger
                                        type="primary"
                                    >
                                        Hủy
                                    </Button>
                                </Popconfirm>
                            </Space>
                        </>
                    )}
                </div>
            </div>
            <Spin spinning={isLoading}>
                <Descriptions title="Thông Tin Đơn Hàng" column={2} size="middle" items={desInventory} bordered />

                <Table
                    title={() => <p>inventory detail</p>}
                    pagination={{ position: ['none'] }}
                    columns={columns}
                    dataSource={inventoty?.items}
                />
            </Spin>
        </div>
    );
}
export default HistoryInventoryDetail;

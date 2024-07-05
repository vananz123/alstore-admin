/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Space, Image, Modal, Upload, Button, Flex, Descriptions } from 'antd';
import type { TableColumnsType, DescriptionsProps } from 'antd';
import { Drawer } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import * as productServices from '@/api/productServices';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Product, ProductItem } from '@/type';
import { FILTERS_PRODUCT_STATUS, OPTIONS_PRODUCT_STATUS, PAPINATION } from '@/common/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/app/hooks';
import { selectDepartment } from '@/app/feature/department/reducer';
import useSearchIndexTable from '@/hooks/useSearchIndexTable';
import { AxiosError } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import useNotification from '@/hooks/useNotification';
import { ChangeCurrence, isAxiosBadRequestError, isAxiosUnauthoriedError } from '@/utils/utils';
import { getAllAdminCate } from '@/api/categoryServices';
import StatusTag from '@/conponents/StatusTag';
import { Result } from '@/api/ResType';
import { useImmer } from 'use-immer';
interface FilterProductByCate {
    text: string;
    value: number;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </button>
);
function ProductList() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { showBoundary } = useErrorBoundary();
    const { contextHolder, openNotification } = useNotification();
    const [content, setContent] = useImmer<{ context: string; currentId: number }>({
        context: 'Bạn có chắc chắn xóa sản phẩm này!',
        currentId: 0,
    });
    const { selected } = useAppSelector(selectDepartment);
    const [currentProductItem, setCurrentProductItem] = useImmer<Product | undefined>(undefined);
    const [modal2Open, setModal2Open] = useImmer(false);
    const [confirmLoadinModal2, setConfirmLoadingModal2] = useImmer(false);
    const [open, setOpen] = useImmer(false);
    const [previewOpen, setPreviewOpen] = useImmer(false);
    const [previewImage, setPreviewImage] = useImmer('');
    const [fileList, setFileList] = useImmer<UploadFile[]>([]);
    const [openDrawer, setOpenDrawer] = useImmer(false);
    const { data, refetch } = useQuery({
        queryKey: [`load-product-list`],
        queryFn: () => productServices.getAllProduct().then((data) => data.resultObj),
    });
    const { data: categories } = useQuery({
        queryKey: [`load-list-category`],
        queryFn: () => getAllAdminCate('all').then((data) => data.resultObj),
    });
    const filterProductByCate: FilterProductByCate[] = [];
    if (categories) {
        categories.forEach((e) => {
            filterProductByCate.push({
                value: e.id,
                text: e.name,
            });
        });
    }
    const { getColumnSearchProps } = useSearchIndexTable();
    const showDrawer = (id: number) => {
        const loadProductDetail = async () => {
            const res = await productServices.getProductDetail(id, selected).then((data) => data.resultObj);
            setCurrentProductItem(res);
        };
        loadProductDetail();
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);
    const columns: TableColumnsType<Product> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu Đề',
            dataIndex: 'seoTitle',
            key: 'seoTitle',
            ...getColumnSearchProps<Product>('seoTitle'),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            sorter: {
                compare: (a: Product, b: Product) => a.price - b.price,
                multiple: 2,
            },
            render: (_: any, record: Product) => <p>{ChangeCurrence(record.price)}</p>,
        },
        {
            title: 'Ảnh',
            key: 'picture',
            render: (_: any, record: Product) => (
                <img
                    src={`${baseUrl + record.urlThumbnailImage}`}
                    className="w-[80px] h-auto cursor-pointer"
                    onClick={() => showModalImage(record.id)}
                />
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (_, record) => <p>{categories ? categories.find((x) => x.id === record.categoryId)?.name : ''}</p>,
            filters: filterProductByCate,
            onFilter: (value: any, record: Product) => record.categoryId === value,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <StatusTag status={record.status} options={OPTIONS_PRODUCT_STATUS} />,
            filters: FILTERS_PRODUCT_STATUS,
            onFilter: (value: any, record: Product) => record.status === value,
        },
        {
            title: 'Lượt Xem',
            dataIndex: 'viewCount',
            key: 'viewCount',
            sorter: {
                compare: (a: Product, b: Product) => a.viewCount - b.viewCount,
                multiple: 2,
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Link to={`/product/edit/${record.id}`}>Edit</Link>
                    {record.price <= 0 && <a onClick={() => showModalDel(record.id)}>Delete</a>}
                    <a onClick={() => showDrawer(record.id)} key={`a-${record.id}`}>
                        View
                    </a>
                </Space>
            ),
        },
    ];
    const columnsView: TableColumnsType<ProductItem> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Size',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <p>{record.name == undefined ? 'not' : `${record.name}: ${record.value} ${record.sku}`}</p>
            ),
        },
        {
            title: 'KM',
            dataIndex: 'valuePromotion',
            key: 'Promotion',
            render: (_, record) => (
                <p>
                    {record.type == undefined
                        ? 'not'
                        : record.type == 'fixed'
                          ? `${record.valuePromotion}VNG`
                          : `${record.valuePromotion}%`}
                </p>
            ),
        },
        {
            title: 'Giá sau KM',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Giá',
            dataIndex: 'priceBeforeDiscount',
            key: 'priceBeforeDiscount',
        },
        {
            title: 'Giá vốn',
            dataIndex: 'capitalPrice',
            key: 'capitalPrice',
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stock',
            key: 'stock',
        },
    ];
    const desProduct: DescriptionsProps['items'] = [
        {
            key: 'Name',
            label: 'Tên',
            children: <span>{currentProductItem?.name}</span>,
        },{
            key: 'Name',
            label: 'Sản phẩm con',
            children: '',
        },
        {
            key: 'Items',
            children: (
                <div>
                    {currentProductItem?.items && (
                        <Table
                            rowKey={(record) => record.id}
                            columns={columnsView}
                            pagination={{ position: ['none'] }}
                            dataSource={currentProductItem.items}
                        />
                    )}
                </div>
            ),
        },
    ];
    const showModalImage = (id: number) => {
        setContent((draft) => {
            draft.currentId = id;
        });
        setModal2Open(true);
    };
    const showModalDel = (id: number) => {
        setContent((draft) => {
            draft.currentId = id;
        });
        setOpen(true);
    };
    const deleteProduct = useMutation({
        mutationKey: [`delete-product`],
        mutationFn: (id: number) => productServices.deleteProduct(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                setOpen(false);
                setFileList([]);
                openNotification('success', data.message);
            }
        },
        onError: (error: AxiosError<Result>) => {
            if (isAxiosUnauthoriedError(error)) showBoundary(error);
            if (isAxiosBadRequestError(error)) openNotification('error', error.response?.data.message);
        },
    });
    const handleOkDel = () => {
        deleteProduct.mutateAsync(content.currentId);
    };
    const uploadImageAPI = async () => {
        setConfirmLoadingModal2(true);
        const res = await productServices.uploadThumbnailImage(content.currentId, fileList[0].originFileObj);
        if (res != null) {
            setConfirmLoadingModal2(false);
            setModal2Open(false);
            refetch();
            setFileList([]);
        }
    };
    return (
        <div>
            {contextHolder}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/product/add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                </Flex>
                <Table rowKey={(record) => record.id} pagination={PAPINATION} columns={columns} dataSource={data} />
            </Space>
            <Drawer width={640} placement="right" closable={true} onClose={onClose} extra={<Button type='primary'><Link to={`/product/edit/${currentProductItem?.id}`}>Edit</Link></Button>} open={openDrawer}>
                <Descriptions title="Thông tin sản phẩm" items={desProduct} column={1} />
            </Drawer>
            <Modal
                title="Upload image"
                centered
                confirmLoading={confirmLoadinModal2}
                open={modal2Open}
                onOk={() => uploadImageAPI()}
                onCancel={() => setModal2Open(false)}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Modal>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={deleteProduct.isPending}
                onCancel={() => setOpen(false)}
            >
                <p>{content.context}</p>
            </Modal>
        </div>
    );
}
export default ProductList;

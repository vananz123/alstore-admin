/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Space, Image, Modal, Upload, Button, Flex, Descriptions, Input } from 'antd';
import type { TableColumnsType, DescriptionsProps, InputRef, TableColumnType } from 'antd';
import { Drawer } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import * as productServices from '@/api/productServices';
import React from 'react';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Product } from '@/type';
import { FILTERS_PRODUCT_STATUS } from '@/common/common';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useQuery } from '@tanstack/react-query';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
type DataIndex = keyof Product;
function ProductList() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [currentProductItem, setCurrentProductItem] = React.useState<Product>();
    const [modal2Open, setModal2Open] = React.useState(false);
    const [confirmLoadinModal2, setConfirmLoadingModal2] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const {data ,isLoading , refetch} = useQuery({
        queryKey:['load-product-list'],
        queryFn:()=> productServices.getAllProduct()
    })
    //product search
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const searchInput = React.useRef<InputRef>(null);

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    //
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Product> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const showDrawer = (id: number) => {
        const loadProductDetail = async () => {
            const res = await productServices.getProductDetail(id);
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

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
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
            ...getColumnSearchProps('seoTitle'),
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
                    style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                    onClick={() => showModalImage(record.id)}
                />
            ),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
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
                    <Button icon={<DeleteOutlined />} onClick={() => showModalDel(record.id, record.name)}></Button>
                    <Link to={`/admin/product-edit/${record.id}`}>
                        <Button icon={<EditOutlined />}></Button>
                    </Link>
                    <Button
                        icon={<InfoCircleOutlined />}
                        onClick={() => showDrawer(record.id)}
                        key={`a-${record.id}`}
                    ></Button>
                </Space>
            ),
        },
    ];
    const desProduct: DescriptionsProps['items'] = [
        {
            key: 'Name',
            label: 'Name',
            children: <span>{currentProductItem?.name}</span>,
        },
        {
            key: 'Promotion',
            label: 'Promotion',
            children: <span>{currentProductItem?.valuePromotion}</span>,
        },
    ];
    const showModalImage = (id: number) => {
        setCurrentId(id);
        setModal2Open(true);
    };
    const showModalDel = (id: number, name: string) => {
        setModalText(`Do you want product ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const handleOkDel = async () => {
        setModalText('deleting!');
        const res = await productServices.deleteProduct(currentId);
        if (res.statusCode == 204) {
            refetch()
            setOpen(false);
            setFileList([]);
        } else {
            setModalText('error!');
        }
    };
    const uploadImageAPI = async () => {
        setConfirmLoadingModal2(true);
        const res = await productServices.uploadThumbnailImage(currentId, fileList[0].originFileObj);
        if (res != null) {
            setConfirmLoadingModal2(false);
            setModal2Open(false);
            refetch()
            setFileList([]);
        }
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/admin/product-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Thêm
                        </Button>
                    </Link>
                </Flex>
                <Table
                    rowKey={(record) => record.id}
                    pagination={{ position: ['bottomLeft'], pageSize: 10 }}
                    columns={columns}
                    dataSource={data}
                />
            </Space>

            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openDrawer}>
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    User Profile
                </p>
                <Descriptions title="Product profile" items={desProduct} />
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
                confirmLoading={isLoading}
                onCancel={() => setOpen(false)}
            >
                <p>{modalText}</p>
            </Modal>
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
export default ProductList;

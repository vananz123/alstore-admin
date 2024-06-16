/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import * as productServices from '@/api/productServices';
import { Product, ProductItem } from '@/type';
import {
    Button,
    Drawer,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    SelectProps,
    Space,
    Switch,
    Table,
    TableColumnsType,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ModalAssignGuarantiesProductItem from '@/conponents/ModalAssignGuarantiesProductItem';
import ModalAssginPromotionsProductItem from '@/conponents/ModalAssginPromotionsProductItem';
import { OPTIONS_SKU, FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
import useNotification from '@/hooks/useNotification';
import { useForm } from 'antd/es/form/Form';
import { useMutation } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';
interface Body {
    isSize: boolean;
    data: ProductItem;
}
interface Props {
    productItem: ProductItem[] | undefined;
    product: Product | undefined;
    refetch: () => void;
}
type StatusForm = 'EDIT' | 'ADD';
const ProductItemConfig: React.FC<Props> = ({ productItem, product, refetch }) => {
    const [form] = useForm();
    const { contextHolder, openNotification } = useNotification();
    const {showBoundary} = useErrorBoundary()
    const [openProductItem, setOpenProductItem] = React.useState(false);
    const [openModalDel, setOpenModalDel] = React.useState(false);
    const [isSize, setIsSize] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [openModalAssignPI, setOpenModalAssignPI] = React.useState<boolean>(false);
    const [openModalAssignPromotionPI, setOpenModalAssignPromotionPI] = React.useState<boolean>(false);
    const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const [statusForm, SetStatusForm] = React.useState<StatusForm>('ADD');
    const showDrawerProductItem = () => {
        setOpenProductItem(true);
    };
    useEffect(() => {
        setOptions(options);
        if (productItem != undefined && productItem.length > 0) {
            setIsSize(productItem[0].isMulti);
        }
    }, [options, productItem]);
    useEffect(() => {
        if (currentProductItem) form.setFieldsValue(currentProductItem);
    }, [form, currentProductItem]);
    const columns: TableColumnsType<ProductItem> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <p>{record.name == undefined ? 'not' : `${record.name}: ${record.value} ${record.sku}`}</p>
            ),
        },
        {
            title: 'Promotion',
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
            title: 'Giá',
            dataIndex: 'price',
            key: 'description',
        },
        {
            title: 'Tồn kho',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size={'small'} direction="vertical">
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setCurrentProductItem(record);
                            setOpenModalDel(true)
                        }}
                    >
                        Del
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setCurrentProductItem(record);
                            setOpenProductItem(true);
                            SetStatusForm('EDIT');
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setCurrentProductItem(record);
                            setOpenModalAssignPI(true);
                        }}
                    >
                        Guaranties
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setCurrentProductItem(record);
                            setOpenModalAssignPromotionPI(true);
                        }}
                    >
                        Promotion
                    </Button>
                </Space>
            ),
        },
    ];
    const createProductItem = useMutation({
        mutationKey: ['create-product-item'],
        mutationFn: (body: Body) => productServices.addProductItem(body.isSize, body.data),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotification('success', data.message);
            } else {
                openNotification('error', data.message);
            }
        },
        onError:((error:AxiosError)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }
        })
    });
    const updateProductItem = useMutation({
        mutationKey: ['update-product-item'],
        mutationFn: (body: ProductItem) => productServices.updateProductItem(body),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotification('success', data.message);
            } else {
                openNotification('error', data.message);
            }
        },onError:((error:AxiosError)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }
        })
    });
    const deleteProductItem = useMutation({
        mutationKey: ['delete-product-item'],
        mutationFn: (id: number) => productServices.deleteProductItem(id),
        onSuccess: (data) => {
            if (data.isSuccessed === true) {
                refetch();
                openNotification('success', data.message);
            } else {
                openNotification('error', data.message);
            }
        },onError:((error:AxiosError)=>{
            if(error.response?.status === 403){
                showBoundary(error)
            }
        })
    });
    const onFinishProductItem = async (values: ProductItem) => {
        if (productItem != undefined && product != undefined) {
            values.productId = product.id;
            if (statusForm == 'ADD') {
                const body: Body = {
                    isSize: isSize,
                    data: values,
                };
                createProductItem.mutate(body);
            } else {
                if (currentProductItem) {
                    values.id = currentProductItem?.id;
                    updateProductItem.mutate(values);
                }
            }
        }
    };
    return (
        <div>
            {contextHolder}
            <Table
                title={() => (
                    <>
                        <Button
                            type="primary"
                            disabled={isSize ===false && productItem && productItem.length == 1}
                            onClick={() => {
                                form.resetFields();
                                showDrawerProductItem();
                                SetStatusForm('ADD');
                            }}
                        >
                            Add
                        </Button>
                    </>
                )}
                pagination={{ position: ['none'] }}
                columns={columns}
                dataSource={productItem}
                rowKey={(record) => record.id}
            />

            <Drawer
                title="Create product item"
                width={'auto'}
                onClose={() => setOpenProductItem(false)}
                open={openProductItem}
            >
                {typeof productItem !== 'undefined' && (
                    <>
                        <Switch
                            checked={isSize}
                            checkedChildren="size"
                            unCheckedChildren="No size"
                            onChange={() => {
                                setIsSize(!isSize);
                            }}
                            disabled={productItem.length > 0}
                        />
                    </>
                )}
                <Form
                    {...FORM_ITEM_LAYOUT}
                    name="dynamic_form_nest_item"
                    form={form}
                    onFinish={onFinishProductItem}
                    style={{ width: 300, marginTop: 10 }}
                    autoComplete="off"
                >
                    <Form.Item<ProductItem>
                        label="Giá"
                        name="price"
                        //initialValue={productItem[0]?.price}
                        rules={[{ required: true, message: 'Missing price' }]}
                    >
                        <InputNumber type="number" style={{ width: 150 }} placeholder="Price" min={0} />
                    </Form.Item>
                    {isSize === true && (
                        <>
                            <Form.Item<ProductItem>
                                label="Giá trị"
                                name="value"
                                //initialValue={productItem[0]?.price}
                                rules={[{ required: true, message: 'Missing price' }]}
                            >
                                <Input placeholder="Value" style={{ width: 100 }} />
                            </Form.Item>
                            <Form.Item<ProductItem>
                                label="Đơn vị"
                                name="sku"
                                rules={[{ required: true, message: 'Missing stock' }]}
                            >
                                <Select
                                    size={'middle'}
                                    //onChange={handleChange}
                                    style={{ width: 70 }}
                                    options={OPTIONS_SKU}
                                />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Modal
                title={'Xóa'}
                confirmLoading={deleteProductItem.isPending}
                open={openModalDel}
                onCancel={() => setOpenModalDel(false)}
                onOk={() => {
                    if (currentProductItem) {
                        deleteProductItem.mutate(currentProductItem.id);
                    }
                }}
            >
                Del
            </Modal>
            <ModalAssignGuarantiesProductItem
                openModalAssignPI={openModalAssignPI}
                setStateOpenModalAssignPI={setOpenModalAssignPI}
                productItemProps={currentProductItem}
                refetch={refetch}
            />
            <ModalAssginPromotionsProductItem
                openModalAssignPI={openModalAssignPromotionPI}
                setStateOpenModalAssignPI={setOpenModalAssignPromotionPI}
                productItemProps={currentProductItem}
                refetch={refetch}
            />
        </div>
    );
};

export default ProductItemConfig;

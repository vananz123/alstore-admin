/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import * as productServices from "@/api/productServices"
import { Product, ProductItem } from '@/type';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import {
    Button,
    Col,
    Drawer,
    Flex,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    SelectProps,
    Skeleton,
    Space,
    Switch,
    Table,
    TableColumnsType,
} from 'antd';
import { EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAssignGuarantiesProductItem from '../ModalAssignGuarantiesProductItem';
import ModalAssginPromotionsProductItem from '../ModalAssginPromotionsProductItem';
import { OPTIONS_SKU,FORM_ITEM_LAYOUT } from '@/common/common';
interface Props {
    productItem: ProductItem[] | undefined;
    product:Product | undefined;
    onSetState :SetStateAction<any>;
}
const ProductItemConfig: React.FC<Props> = ({ productItem ,onSetState,product}) => {
    const [openProductItem, setOpenProductItem] = React.useState(false);
    const [isSize, setIsSize] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [openModalAssignPI, setOpenModalAssignPI] = React.useState<boolean>(false);
    const [openModalAssignPromotionPI, setOpenModalAssignPromotionPI] = React.useState<boolean>(false);
    const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const showDrawerProductItem = () => {
        setOpenProductItem(true);
    };
    useEffect(() => {
        setOptions(options);
        if (productItem != undefined) {
            if (productItem.length > 1) {
                setIsSize(true);
            }
        }
    }, [options,productItem]);
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
            render:(_,record)=>(
                <p>{record.name == undefined ? "not" :`${record.name}: ${record.value} ${record.sku}`}</p>
            )
        },{
            title: 'Promotion',
            dataIndex: 'valuePromotion',
            key: 'Promotion',
            render:(_,record)=>(
                <p>{record.type == undefined ? "not" : (record.type == 'fixed' ? `${record.valuePromotion}VNG`: `${record.valuePromotion}%`)}</p>
            )
        },
        {
            title: 'Mô Tả',
            dataIndex: 'price',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size={'small'} direction='vertical'>
                    <Button
                    icon={<EditOutlined/>}
                        onClick={() => {
                            setCurrentProductItem(record);
                            setOpenModalAssignPI(true);
                        }}
                    >
                        Guaranties
                    </Button>
                    <Button
                    icon={<EditOutlined/>}
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
    const onFinishProductItem = async (values: any) => {
        if (productItem != undefined && product != undefined) {
            if (isSize === true) {
                const res = await productServices.addProductSize(product.id, values.items);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    setOpenProductItem(false);
                    openNotificationWithIcon('success', 'Add Product item success');
                }
            } else {
                const res = await productServices.addProductNoSize(product.id, values.price, values.stock);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    setOpenProductItem(false);
                    openNotificationWithIcon('success', 'Add Product item size success');
                }
            }
        }
    };
    return (
        <div>
            {contextHolder}
            {productItem != undefined && productItem.length > 0 ? (
                <>
                    
                    <Table
                        title={()=><>
                        <Flex justify='space-between'>
                            <p>Product item config</p>
                            <Button style={{marginBottom:5}} type='primary' size='large' onClick={() => showDrawerProductItem()}>Edit</Button>
                        </Flex>
                        </>}
                        pagination={{ position: ['none'] }}
                        columns={columns}
                        dataSource={productItem}
                        rowKey={(record) => record.id}
                    />
                </>
            ) : (
                <Flex style={{marginTop:5}} align="center" justify="center">
                    <Button type="primary" size="large" onClick={showDrawerProductItem} icon={<PlusOutlined />}>
                        Config product
                    </Button>
                </Flex>
            )}

            <Drawer
                title="Create product item"
                width={'auto'}
                onClose={() => setOpenProductItem(false)}
                open={openProductItem}
            >
                {typeof productItem !== 'undefined' ? (
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
                ) : (
                    <Skeleton />
                )}
                <Form
                    {...FORM_ITEM_LAYOUT}
                    name="dynamic_form_nest_item"
                    onFinish={onFinishProductItem}
                    style={{ maxWidth: 600, marginTop: 10 }}
                    autoComplete="off"
                >
                    {isSize === true ? (
                        <Form.List name="items" initialValue={productItem}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                rules={[{ required: true, message: 'Missing price' }]}
                                            >
                                                <InputNumber
                                                    type="number"
                                                    placeholder="Price"
                                                    min={0}
                                                    style={{ width: 120, marginRight: '5px' }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'stock']}
                                                rules={[{ required: true, message: 'Missing stock' }]}
                                            >
                                                <InputNumber
                                                    type="number"
                                                    placeholder="Stock"
                                                    min={0}
                                                    style={{ width: 70, marginRight: '5px' }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'value']}
                                                rules={[{ required: true, message: 'Missing value' }]}
                                            >
                                                <Input placeholder="value" style={{ width: 70, marginRight: '5px' }} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'sku']}
                                                rules={[{ required: true, message: 'Missing SKU' }]}
                                            >
                                                <Select
                                                    size={'middle'}
                                                    //onChange={handleChange}
                                                    style={{ width: 70 }}
                                                    options={OPTIONS_SKU}
                                                />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    ) : (
                        <>
                            {typeof productItem !== 'undefined'? <Row>
                                <Col span={8}>
                                    <Form.Item<ProductItem>
                                        name="price"
                                        initialValue={productItem[0]?.price}
                                        rules={[{ required: true, message: 'Missing price' }]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Price"
                                            min={0}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item<ProductItem>
                                        name="stock"
                                        initialValue={productItem[0]?.stock}
                                        rules={[{ required: true, message: 'Missing stock' }]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Stock"
                                            min={0}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>: <Skeleton/>}
                        </>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <ModalAssignGuarantiesProductItem
                openModalAssignPI={openModalAssignPI}
                setStateOpenModalAssignPI={setOpenModalAssignPI}
                productItemProps={currentProductItem}
                setStateProduct={onSetState}
            />
            <ModalAssginPromotionsProductItem
            openModalAssignPI={openModalAssignPromotionPI}
            setStateOpenModalAssignPI={setOpenModalAssignPromotionPI}
            productItemProps={currentProductItem}
            setStateProduct={onSetState}
            />
        </div>
    );
};

export default ProductItemConfig;

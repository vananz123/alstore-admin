/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, lazy, useCallback, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Upload, Select, Space, Drawer, Col, Row } from 'antd';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, Category } from '@/type';
import * as productServices from '@/api/productServices';
import type { SelectProps } from 'antd';
import { StatusForm } from '@/type';
import * as categoryServices from '@/api/categoryServices';
const ProductItemConfig = lazy(()=> import('../ProductItemConfig'));
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_PRODUCT_STATUS, editorConfiguration } from '@/common/common';
const UploadImages  =lazy(()=> import('@/view/product/UploadImages'));
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const ProductForm: React.FC<{
    product: Product | undefined;
    onSetState: SetStateAction<any>;
    onSetStatus: SetStateAction<any>;
}> = ({ product, onSetState, onSetStatus }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    useEffect(() => {
        if (product) setValue(product.seoDescription);
        form.setFieldsValue(product);
    }, [form, product]);
    const [value, setValue] = React.useState<string>('<p></p>');
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const [openUploadImage, setUploadImage] = React.useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const showDrawerVariation = () => {
        setOpenVariaton(true);
    };
    const ConcatList = (listCate: Category[]) => {
        const list: Category[] = [];
        if (listCate && listCate.length > 0) {
            listCate.forEach((element) => {
                if (element.subCategory && element.subCategory.length > 0) {
                    element.subCategory.forEach((item) => {
                        if (item) {
                            list.push(item);
                        }
                    });
                }
            });
        }
        return list;
    };
    const getAllCate = useCallback(async () => {
        const res = await categoryServices.getAllAdminCate();
        console.log(res);
        const list = ConcatList(res.resultObj);
        const options: SelectProps['options'] = [];
        list.forEach((e: Category) => {
            options.push({
                value: e.id,
                label: e.name,
            });
        });
        setOptions(options);
    }, []);
    useEffect(() => {
        getAllCate();
    }, [getAllCate]);
    const createProduct = useMutation({
        mutationKey: ['ceate-product'],
        mutationFn: (body: Product) => productServices.addProduct(body),
        onSuccess: (res) => {
            if (res.isSuccessed === true) {
                openNotificationWithIcon('error', "Thêm thành công");
                navigate(`/product-edit/${res.resultObj.id}`);
            } else {
                openNotificationWithIcon('error', res.message);
            }
        },
    });
    const updateProduct = useMutation({
        mutationKey: ['update-product'],
        mutationFn: (body: Product) => productServices.updateProduct(body),
        onSuccess: (res) => {
            if (res.isSuccessed === true) {
                const status: StatusForm = 'success';
               // onSetState(res.resultObj);
                onSetStatus(status);
                openNotificationWithIcon('success', 'Edit Product success');
            } else {
                const status: StatusForm = 'error';
                onSetStatus(status);
                openNotificationWithIcon('error', res.message);
            }
        },
    });
    const onFinish: FormProps<Product>['onFinish'] = async (values) => {
        if (product != undefined) {
            values.seoDescription = value;
            values.id = product.id
            updateProduct.mutateAsync(values)
        } else {
            values.seoDescription = value;
            createProduct.mutateAsync(values);
        }
    };
    const onFinishVariation = async (values: any) => {
        if (product != undefined) {
            console.log(values)
            const res = await productServices.addVariation(product.id, values.variations);
            if (res.isSuccessed === true) {
                onSetState(res.resultObj);
                setOpenVariaton(false);
                openNotificationWithIcon('success', 'Add variation success');
            }
        }
    };
    const onFinishFailed: FormProps<Product>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
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
            <Row gutter={16}>
                <Col xs={24} xl={12}>
                    <Form
                        {...FORM_ITEM_LAYOUT}
                        form={form}
                        name="productFrom"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item<Product>
                            name="name"
                            label="Tên sản phẩm"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input product name!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<Product>
                            name="seoTitle"
                            label="Tiêu đề"
                            //initialValue={product?.seoTitle}
                            rules={[{ required: true, message: 'Please input seo title' }]}
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item<Product> label="Mô Tả">
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                data={value || '<p></p>'}
                                // onReady={(editor) => {
                                //     // You can store the "editor" and use when it is needed.
                                //     console.log('Editor is ready to use!', editor);
                                // }}
                                onChange={(_, editor) => {
                                    setValue(editor.getData());
                                }}
                                // onBlur={(event, editor) => {
                                //     console.log('Blur.', editor);
                                // }}
                                // onFocus={(event, editor) => {
                                //     console.log('Focus.', editor);
                                // }}
                            />
                        </Form.Item>
                        <Form.Item name="file" label="Ảnh Nền" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload listType="picture-card" maxCount={1}>
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item<Product>
                            name="categoryId"
                            label="Loại Sản Phẩm"
                            rules={[{ required: true, message: 'Please select categories!' }]}
                        >
                            <Select size={'middle'} style={{ width: 200 }} options={options} />
                        </Form.Item>
                        <Form.Item<Product>
                            name="status"
                            label="Trạng Thái"
                            initialValue={1}
                            rules={[{ required: true, message: 'Please select Status!' }]}
                        >
                            <Select
                                disabled={
                                    (product?.items && product.items.length < 1) || typeof product === 'undefined'
                                }
                                size={'middle'}
                                style={{ width: 200 }}
                                options={OPTIONS_PRODUCT_STATUS}
                            />
                        </Form.Item>
                        {product ? (
                            <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                                <Button type="primary" htmlType="submit" loading={updateProduct.isPending}>
                                    Save
                                </Button>
                            </Form.Item>
                        ) : (
                            <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                                <Button type="primary" htmlType="submit" loading={createProduct.isPending}>
                                    Save
                                </Button>
                            </Form.Item>
                        )}
                    </Form>
                </Col>
                <Col xs={24} xl={12}>
                    {product && (<ProductItemConfig product={product} productItem={product?.items} onSetState={onSetState} />)}
                </Col>
            </Row>

            {product != undefined && (
                <>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                setUploadImage(true);
                            }}
                            icon={<PlusOutlined />}
                        >
                            Upload image
                        </Button>
                        <Button type="primary" onClick={showDrawerVariation} icon={<PlusOutlined />}>
                            Config Variation
                        </Button>
                    </Space>
                </>
            )}
            <Drawer title="Create variation" width={600} onClose={() => setOpenVariaton(false)} open={openVariaton}>
                <Form
                    {...FORM_ITEM_LAYOUT}
                    name="dynamic_form_nest_item"
                    onFinish={onFinishVariation}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.List name="variations" initialValue={product?.variation}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[{ required: true, message: 'Missing name' }]}
                                        >
                                            <Input placeholder="Name" style={{ width: 220 }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            rules={[{ required: true, message: 'Missing value' }]}
                                        >
                                            <Input placeholder="Value" style={{ width: 220 }} />
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
                    <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            {product != undefined && <UploadImages open={openUploadImage} setOpen={setUploadImage} product={product} />}
            {contextHolder}
        </div>
    );
};

export default ProductForm;

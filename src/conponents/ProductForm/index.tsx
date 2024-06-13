/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Upload, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Product, Category } from '@/type';
import * as productServices from '@/api/productServices';
import type { SelectProps } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_PRODUCT_STATUS, editorConfiguration } from '@/common/common';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useNotification from '@/hooks/useNotification';
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const ProductForm: React.FC<{
    product: Product | undefined;
    refetch: ()=> void;
}> = ({ product, refetch }) => {
    const navigate = useNavigate();
    const {contextHolder, openNotification} = useNotification();
    const [form] = Form.useForm();
    useEffect(() => {
        if (product) setValue(product.seoDescription);
        form.setFieldsValue(product);
    }, [form, product]);
    const [value, setValue] = React.useState<string>('<p></p>');
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
   
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
                openNotification('error', 'Thêm thành công');
                navigate(`/product/edit/${res.resultObj.id}`);
            } else {
                openNotification('error', res.message);
            }
        },
    });
    const updateProduct = useMutation({
        mutationKey: ['update-product'],
        mutationFn: (body: Product) => productServices.updateProduct(body),
        onSuccess: (res) => {
            if (res.isSuccessed === true) {
                refetch()
                openNotification('success', 'Edit Product success');
            } else {
                openNotification('error', res.message);
            }
        },
    });
    const onFinish: FormProps<Product>['onFinish'] = async (values) => {
        if (product != undefined) {
            values.seoDescription = value;
            values.id = product.id;
            updateProduct.mutateAsync(values);
        } else {
            values.seoDescription = value;
            createProduct.mutateAsync(values);
        }
    };
    const onFinishFailed: FormProps<Product>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
             {contextHolder}
            <Form
                {...FORM_ITEM_LAYOUT}
                form={form}
                name="productFrom"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
            >
                <Form.Item<Product>
                    name="name"
                    label="Tên sản phẩm"
                    tooltip="Tên sản phẩm nội bộ?"
                    rules={[{ required: true, message: 'Please input product name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Product>
                    name="seoTitle"
                    label="Tiêu đề"
                    tooltip="Tên sản phẩm hiện thị công khai?"
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
                        onChange={(_, editor) => {
                            setValue(editor.getData());
                        }}
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
                        disabled={(product?.items && product.items.length < 1) || typeof product === 'undefined'}
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
        </div>
    );
};

export default ProductForm;

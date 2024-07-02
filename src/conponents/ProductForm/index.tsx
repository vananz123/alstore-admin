/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Form, Input, Upload, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Product, Category, ConponentFormProps } from '@/type';
import type { SelectProps, UploadFile } from 'antd';
import { getAllAdminCate } from '@/api/categoryServices';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, OPTIONS_PRODUCT_STATUS, editorConfiguration } from '@/common/common';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { useQuery } from '@tanstack/react-query';
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const ProductForm: React.FC<ConponentFormProps<Product>> = ({ data, isLoading, onFinish, onFinishFailed }) => {
    const [form] = Form.useForm();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fileList: UploadFile[] = [];
    if (data) {
        form.setFieldsValue(data);
        const item: UploadFile = {
            uid: `${Math.random()}`,
            name: data.urlThumbnailImage,
            status: 'done',
            url: baseUrl + data.urlThumbnailImage,
        };
        form.setFieldValue('file', [item]);
    }
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
    const { data: options } = useQuery({
        queryKey: ['load-cate-all'],
        queryFn: () =>
            getAllAdminCate().then((data) => {
                const list = ConcatList(data.resultObj);
                const optionsArr: SelectProps['options'] = [];
                list.forEach((e: Category) => {
                    optionsArr.push({
                        value: e.id,
                        label: e.name,
                    });
                });
                return optionsArr;
            }),
    });
    return (
        <div>
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
                <Form.Item<Product> name="seoDescription" label="Mô Tả">
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={form.getFieldValue('seoDescription') || '<p></p>'}
                        onChange={(_, editor) => {
                            form.setFieldValue('seoDescription', editor.getData());
                        }}
                    />
                </Form.Item>
                <Form.Item name="file" label="Ảnh Nền" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload listType="picture-card" fileList={fileList} maxCount={1}>
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
                            (data?.items && data.items.length < 1) ||
                            typeof data === 'undefined' ||
                            (data.variation && data.variation.length <= 0)
                        }
                        size={'middle'}
                        style={{ width: 200 }}
                        options={OPTIONS_PRODUCT_STATUS}
                    />
                </Form.Item>
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductForm;

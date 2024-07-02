/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Button, Form, Input, Select, SelectProps } from 'antd';
import { Category } from '@/type';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/app/feature/category/reducer';
import { OPTIONS_STATUS, FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
import { loadCategories } from '@/app/feature/category/action';
import { ConponentFormProps } from '@/type';
const CategoryForm: React.FC<ConponentFormProps<Category>> = ({ data, isLoading, onFinish, onFinishFailed }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const cate = useAppSelector(selectCategories).data;
    const optionParent: SelectProps['options'] = [];
    if (cate) {
        cate.forEach((e: Category) => {
            optionParent.push({
                label: e.name,
                value: e.id,
            });
        });
    }
    if (data) form.setFieldsValue(data);
    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);
    return (
        <div>
            <Form
                {...FORM_ITEM_LAYOUT}
                form={form}
                name="productFrom"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item<Category>
                    name="name"
                    label="Tên Loại"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Category> name="parentId" label="Loại">
                    <Select size={'middle'} style={{ width: 200 }} options={optionParent} />
                </Form.Item>
                {typeof data !== 'undefined' ? (
                    <Form.Item<Category>
                        name="status"
                        label="Trạng Thái"
                        rules={[{ required: true, message: 'Please select Status!' }]}
                    >
                        <Select size={'middle'} style={{ width: 200 }} options={OPTIONS_STATUS} />
                    </Form.Item>
                ) : (
                    ''
                )}
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default CategoryForm;

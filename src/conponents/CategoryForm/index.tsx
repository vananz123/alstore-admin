/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Select, SelectProps } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/type';
import { StatusForm } from '@/type';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/app/feature/category/reducer';
import { OPTIONS_STATUS, FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
import { loadCategories } from '@/app/feature/category/action';
import { useNavigate } from 'react-router-dom';
interface Props {
    category: Category | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}
const CategoryForm: React.FC<Props> = ({ category, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const cate = useAppSelector(selectCategories).data;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [optionParent, setOptionParent] = React.useState<SelectProps['options']>([]);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);
    useEffect(() => {
        form.setFieldsValue(category);
        const item: SelectProps['options'] = [];
        if (cate) {
            cate.forEach((e: Category) => {
                item.push({
                    label: e.name,
                    value: e.id,
                });
            });
        }
        setOptionParent(item);
    }, [cate, category, form]);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Category>['onFinish'] = async (values) => {
        setIsLoading(true);
        setContext('');
        if (category != undefined) {
            if (category?.id != undefined) {
                values.id = category.id;
                const res = await categoryServices.updateCate(values);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    const status: StatusForm = 'success';
                    onSetStatus(status);
                } else {
                    const status: StatusForm = 'error';
                    onSetStatus(status);
                }
            }
            setIsLoading(false);
            setContext('Save');
        } else {
            const res = await categoryServices.createCate(values);
            if (res.isSuccessed === true) {
                onSetState(res.resultObj);
                const status: StatusForm = 'success';
                onSetStatus(status);
            } else {
                const status: StatusForm = 'error';
                onSetStatus(status);
            }
            setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps<Category>['onFinishFailed'] = (errorInfo) => {
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
                {typeof category !== 'undefined' ? (
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
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default CategoryForm;
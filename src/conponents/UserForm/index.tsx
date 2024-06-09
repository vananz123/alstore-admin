/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseUser } from '@/api/ResType';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { FormProps, useForm } from 'antd/es/form/Form';
import React, { SetStateAction, useEffect } from 'react';
import * as userServices from '@/api/userServices';
interface Props {
    user: ResponseUser;
    onSetState:SetStateAction<any>;
}
import { useAppDispatch } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { StatusForm } from '@/type';
const UserForm: React.FC<Props> = ({ user ,onSetState }) => {
    const dispatch = useAppDispatch()
    const [form] = useForm();
    useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form]);
    const updateUser = useMutation({
        mutationKey:['update-user'],
        mutationFn:(body:ResponseUser)=> userServices.update(body),
        onSuccess: ()=>{
            dispatch(loadUser())
            const status :StatusForm = 'success'
            onSetState(status)
        },
        onError:()=>{
            const status :StatusForm = 'error'
            onSetState(status)
        }
    })
    const onFinish: FormProps<ResponseUser>['onFinish'] = async (values) => {
        if(values){
            values.id = user.id
            updateUser.mutate(values)
        }
    };

    const onFinishFailed: FormProps<ResponseUser>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                <Form.Item<ResponseUser>
                    name="firstName"
                    label="Tên"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input first name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<ResponseUser>
                    name="lastName"
                    label="Tên điệm"
                    rules={[{ required: true, message: 'Please input last name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<ResponseUser>
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[{ required: true, min:10 , max:10,message: 'Please input phone number!' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<ResponseUser>
                    name='userName'
                    label="Tên hiển thị"
                    rules={[{ required: true, message: 'Please input display name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={updateUser.isPending} style={{ width: '100px' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserForm;

import React from 'react';
import { Button, Form, type FormProps, Input, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined, MailOutlined } from '@ant-design/icons';
import * as userServices from '@/api/userServices';
import { Result } from '@/api/ResType';
import { Link, useNavigate } from 'react-router-dom';
export type RegisterUser = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
};
function Register() {
    const [message, setMessage] = React.useState<Result>();
    const navigator = useNavigate();
    const onFinish: FormProps<RegisterUser>['onFinish'] = async (values) => {
        console.log(values);
        const register = await userServices.Register(values);
        if (register.statusCode == 201) {
            navigator('/auth/login');
        }
        setMessage(register);
    };

    const onFinishFailed: FormProps<RegisterUser>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
        >
            <div>
                {message != undefined ? (
                    message.error != '' ? (
                        <Alert
                            style={{ maxWidth: 600, width: 350 }}
                            message="Error"
                            description={message.message}
                            type="error"
                            showIcon
                        />
                    ) : (
                        <Alert
                            style={{ maxWidth: 600, width: 350 }}
                            message="Success"
                            description={
                                <div>
                                    {message.message} <Link to={'/auth/login'}>Login now</Link>
                                </div>
                            }
                            type="success"
                            showIcon
                        />
                    )
                ) : (
                    ''
                )}

                <Form
                    name="basic"
                    style={{ maxWidth: 600, width: 350, maxHeight: 500, marginTop: '15px' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item<RegisterUser>
                                name="firstName"
                                tooltip="What do you want others to call you?"
                                rules={[{ required: true, message: 'Please input first name!', whitespace: true }]}
                            >
                                <Input placeholder="First name" prefix={<UserOutlined />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<RegisterUser>
                                name="lastName"
                                tooltip="What do you want others to call you?"
                                rules={[{ required: true, message: 'Please input last name!', whitespace: true }]}
                            >
                                <Input placeholder="Last name" prefix={<UserOutlined />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item<RegisterUser>
                        name="userName"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input display name!', whitespace: true }]}
                    >
                        <Input placeholder="Display name" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item<RegisterUser>
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item<RegisterUser>
                        name="phoneNumber"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input phone number!', whitespace: true }]}
                    >
                        <Input placeholder="Phone number" prefix={<InfoCircleOutlined />} />
                    </Form.Item>
                    <Form.Item<RegisterUser>
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            () => ({
                                validator(_, value) {
                                    if (value.length >= 6) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The password must have length better 6!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>{' '}
                        Or <Link to="/auth/login">login now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;

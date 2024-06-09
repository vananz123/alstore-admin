/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Drawer, Button, theme } from 'antd';
import { memo, useCallback } from 'react';
import { Layout, Badge, Avatar, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined, BarsOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
const { Header } = Layout;
import NavC from './NavC';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import SearchC from '@/conponents/SearchC';
import Logo2 from '/logo.png';
import React, { useEffect } from 'react';
import { selectCartDetail } from '@/app/feature/cart/reducer';
import { loadCartDetail } from '@/app/feature/cart/action';
import { loadUser } from '@/app/feature/user/action';
const HeaderC = memo(() => {
    const Navigate = useNavigate();
    const { data } = useAppSelector(selectUser);
    const user = data;
    const cart = useAppSelector(selectCartDetail).data;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user) dispatch(loadCartDetail({ userId: user?.id as string }));
    }, [dispatch, user]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items: MenuProps['items'] = [
        {
            label: (
                <Link
                    onClick={() => {
                        onClose();
                    }}
                    to={'/profile'}
                >
                    Cài đặt
                </Link>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link
                    onClick={() => {
                        onClose();
                    }}
                    to={'/order'}
                >
                    Đơn mua
                </Link>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a
                    onClick={() => {
                        Logout();
                    }}
                >
                    Đăng xuất
                </a>
            ),
            key: '3',
        },
    ];
    const Logout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken != null) {
            localStorage.removeItem('accessToken');
            dispatch(loadUser());
            Navigate('/auth/login');
        }
    };
    const [open, setOpen] = React.useState(false);

    const showDrawer = useCallback(() => {
        setOpen(true);
    }, []);
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="sticky top-0 z-10 shadow">
                <Header style={{ background: colorBgContainer, padding: 0 }}>
                    <div className="header-container">
                        <div className="header-container__nav">
                            <NavC />
                        </div>
                        <div className="header-container__logo">
                            <div className="menu-right">
                                <div className="menu-right__bars" onClick={() => showDrawer()}>
                                    <BarsOutlined />
                                </div>
                                <Link className="menu-right__logo" style={{ width: 64, height: 64 }} to="/">
                                    <img style={{ width: '100%', height: '100%' }} alt="al store" src={Logo2} />
                                </Link>
                            </div>
                        </div>
                        <div className="header-container__usercart">
                            <div>
                                <SearchC />
                            </div>

                            {typeof user !== 'undefined' ? (
                                <>
                                    <Space align="center">
                                        <Dropdown className="hidden lg:block" menu={{ items }} trigger={['click']}>
                                            <strong onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                                                <Space>
                                                    <Avatar style={{ background: '#4096ff' }} icon={<UserOutlined />} />
                                                    <div>{user?.userName}</div>
                                                </Space>
                                            </strong>
                                        </Dropdown>
                                        <Link to={`/cart`} style={{ marginLeft: 5, marginBottom: 5 }}>
                                            <Badge count={cart.items.length} showZero>
                                                <Avatar
                                                    style={{ background: '#4096ff' }}
                                                    icon={<ShoppingCartOutlined />}
                                                />
                                            </Badge>
                                        </Link>
                                    </Space>
                                </>
                            ) : (
                                <div className="w-[70px]">
                                    <Link style={{ color: 'black' }} to={'/auth/login'}>
                                        <p>
                                            Login <LoginOutlined />
                                        </p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Header>
                <Drawer
                    placement="left"
                    closable={true}
                    onClose={onClose}
                    open={open}
                    extra={
                        <>
                            {user && (
                                <div
                                    onClick={() => {
                                        Navigate('/profile');
                                        onClose();
                                    }}
                                    style={{ color: 'black', cursor: 'pointer' }}
                                >
                                    <Space>
                                        <Avatar style={{ background: '#4096ff' }} icon={<UserOutlined />} />
                                        <div>{user?.userName}</div>
                                    </Space>
                                </div>
                            )}
                        </>
                    }
                >
                    <div>
                        <NavC type="forMobile" closeDrawer={setOpen} />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                            }}
                        >
                            {user && (
                                <Button
                                    icon={<LogoutOutlined />}
                                    style={{ color: 'black' }}
                                    onClick={() => {
                                        Logout();
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                            )}
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    );
});

export default HeaderC;

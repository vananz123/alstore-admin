/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeaderA } from '../components';
import { ConfigProvider, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content, Sider } = Layout;
import { useSkin } from '@/hooks';
import Nav from '../components/Nav';
import { useImmer } from 'use-immer';
import { CSSProperties } from 'react';
import Logo from '/logo.png';
function AdminLayout() {
    const { style, skin } = useSkin();
    const [collapsed, setCollapsed] = useImmer(false);
    const bg: CSSProperties = {
        background: '#bae0ff',
    };
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    return (
        <ConfigProvider
            theme={{
                algorithm: skin == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <Layout>
                <Sider
                    width={200}
                    style={skin === 'light' ? bg : style}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className="demo-logo-vertical">
                        <img className="w-[80px] h-[80px]" src={Logo} alt="la store" />
                    </div>
                    <Nav />
                </Sider>
                <Layout>
                    <HeaderA />

                    <Content style={{ margin: '24px 16px 0' }}>
                        <div
                            style={{
                                ...style,
                                padding: 24,
                                minHeight: '100vh',
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default AdminLayout;

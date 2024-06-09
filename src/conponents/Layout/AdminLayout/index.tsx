/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeaderA, SiderC } from '../components';
import { ConfigProvider, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
import { useSkin } from '@/hooks';
function AdminLayout() {
    const { style ,skin} = useSkin();
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    return (
        <ConfigProvider
            theme={{
                algorithm:skin =='dark' ? theme.darkAlgorithm: theme.defaultAlgorithm
            }}
        >
            <Layout>
                <SiderC />
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

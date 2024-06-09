import { HeaderC, FooterC } from '../components';
import { Layout, theme } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';
function DefaultLayout() {
    const {
        token: { borderRadiusLG, colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <Layout>
                <Layout>
                    <HeaderC />
                    <Content
                        style={{
                            marginTop: 10,
                            minHeight: 360,
                            borderRadius: borderRadiusLG,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <FooterC />
                </Layout>
            </Layout>
        </div>
    );
}

export default DefaultLayout;

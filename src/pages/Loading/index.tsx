import { useSkin } from '@/hooks';
import { Layout, theme, ConfigProvider } from 'antd';
const { Content, Header } = Layout;
function Loading() {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    const { style, skin } = useSkin();
    return (
        <ConfigProvider
            theme={{
                algorithm: skin == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <Layout>
                <Layout>
                    <Header style={style}></Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div
                            style={{
                                ...style,
                                padding: 24,
                                minHeight: '100vh',
                                borderRadius: borderRadiusLG,
                            }}
                        ></div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default Loading;

import Container from '@/conponents/Container';
import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Flex, Row, Space } from 'antd';
function ProductDetailLoading() {
    return (
        <>
            <Container>
                <SkeletonCard style={{ width: 100, height: 40, marginBottom: 10 }} />
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={14} className="gutter-row">
                        <Flex justify="space-between" gap={5}>
                            <SkeletonCard className="w-full h-[250px] md:h-[550px]" />
                            <div className="flex flex-col w-[150px] md:w-[250px] gap-3">
                                <SkeletonCard className="w-full h-[120px]  md:h-[200px]" />
                                <SkeletonCard className="w-full h-[120px]  md:h-[200px]" />
                            </div>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10} className="gutter-row">
                        <Space direction="vertical">
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                        </Space>
                        <Flex justify="space-between" style={{ marginTop: 10 }}>
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                        </Flex>
                    </Col>
                </Row>
            </Container>
            <Container>
                <div className="w-full flex justify-center md:p-5">
                    <SkeletonCard className="w-full h-[200px]" />
                </div>
            </Container>
            <Container>
                <Row gutter={[24, 24]}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Col
                            key={index}
                            style={{ display: 'flex', justifyContent: 'center' }}
                            xs={12}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={6}
                            className="gutter-row"
                        >
                            <SkeletonCard className="w-full h-[300px] md:h-[400px]" />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default ProductDetailLoading;

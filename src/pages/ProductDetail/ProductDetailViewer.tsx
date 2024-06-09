import Container from '@/conponents/Container';
import ProductCard from '@/conponents/ProductCard';
import useProductViewerStore from '@/hooks/useProductViewerStore';
import { Col, Row } from 'antd';

function ProductDetailViewer() {
    const { products } = useProductViewerStore();
    console.log(products);
    return (
        <Container>
            <div>
                <div className="flex justify-start my-3">
                    <p className="text-[18px] font-bold">Sản phẩm đã xem</p>
                </div>
                {typeof products !== 'undefined' && (
                    <Row gutter={[16, 16]}>
                        {products.length > 0 && (
                            <>
                                {products.map((e) => (
                                    <Col
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                        xs={12}
                                        sm={8}
                                        md={8}
                                        lg={8}
                                        xl={6}
                                        className="gutter-row"
                                        key={e.id}
                                    >
                                        <ProductCard key={e.id} product={e} />
                                    </Col>
                                ))}
                            </>
                        )}
                    </Row>
                )}
            </div>
        </Container>
    );
}

export default ProductDetailViewer;

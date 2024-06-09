import Container from '@/conponents/Container';
import ProductCard from '@/conponents/ProductCard';
import { Product } from '@/type';
import { Col, Row } from 'antd';
import React from 'react';
interface Props {
    similarProduct: Product[] | undefined;
}
const ProductDetailSimilarProduct: React.FC<Props> = React.memo( ({ similarProduct }) => {
    return (
        <Container>
            <div>
                <div className="flex justify-start my-3">
                    <p className="text-[18px] font-bold">Sản phẩm tương tự</p>
                </div>
                {typeof similarProduct !== 'undefined' && (
                    <Row gutter={[16, 16]}>
                        {similarProduct.map((e: Product) => (
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
                                <ProductCard product={e} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </Container>
    );
});

export default ProductDetailSimilarProduct;

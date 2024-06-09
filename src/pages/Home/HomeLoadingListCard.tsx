import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Row } from 'antd';

function HomeLoadingListCard() {
    return (
        <div>
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
                        <SkeletonCard className="w-full h-[260px] md:h-[350px]" />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomeLoadingListCard;

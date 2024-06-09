import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Row } from 'antd';

function ProfileLoading() {
    return (
        <div className="w-full">
            <SkeletonCard className="w-[100px] h-[30px] mb-3" />
            <Row gutter={[24, 8]}>
                <Col xs={24} lg={14}>
                <SkeletonCard className="w-[150px] h-[40px] mb-3" />
                    <SkeletonCard className="w-full h-[200px]" />
                </Col>

                <Col xs={24} lg={10}>
                    <SkeletonCard className="w-[150px] h-[40px] mb-3" />
                    {Array.from({length:2}).map((_,index)=>(
                        <SkeletonCard key={index} className="w-full h-[200px] mb-3" />
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default ProfileLoading;

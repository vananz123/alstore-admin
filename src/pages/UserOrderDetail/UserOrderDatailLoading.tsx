import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Row } from 'antd';

function UserOrderDatailLoading() {
    return (
        <div>
            <SkeletonCard className='w-[100px] h-[40px] mb-3'/>
            <Row gutter={16}>
                <Col xs={24} md={24} lg={8} xl={8}>
                <SkeletonCard  className='w-full h-[400px] mb-3'/>
                    {Array.from({length:3}).map((_,index)=>(
                         <SkeletonCard key={index} className='w-full h-[32px] mb-3' />
                    ))}
                </Col>
                <Col xs={24} md={24} lg={16} xl={16}>
                {Array.from({length:3}).map((_,index)=>(
                         <SkeletonCard key={index} className='w-full h-[160px] mb-3'/>
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default UserOrderDatailLoading;

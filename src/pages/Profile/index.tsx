import { ArrowLeftOutlined} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import  { lazy} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import ProfileLoading from './ProfileLoading';
import Container from '@/conponents/Container';
const ProfileAddress = lazy(()=> import('./ProfileAddress'));
const ProfileInfo  =lazy(()=> import('./ProfileInfo'));
function Profile() {
    const Navigate = useNavigate();
    const {data:user,isLoading} = useAppSelector(selectUser);
    const GoBack = () => {
        Navigate(-1);
    };
    return (
        <Container>
            <div className='mb-3 lg:mb-1 flex justify-between lg:block'>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    size="small"
                    style={{ marginBottom: '10px' }}
                    onClick={() => {
                        GoBack();
                    }}
                >
                    Go back
                </Button>
               <div className='lg:hidden'>
                    <Button type='primary' onClick={()=> Navigate('/order')}>
                        Đơn mua
                    </Button>
               </div>
            </div>
            {isLoading ? (
                <ProfileLoading />
            ) : (
                user && (
                    <>
                        <Row gutter={[24, 8]}>
                            <Col xs={24} lg={14}>
                               <ProfileInfo user={user}/>
                            </Col>
                            <Col xs={24} lg={10}>
                                <ProfileAddress user={user}/>
                            </Col>
                        </Row>
                        
                    </>
                )
            )}
        </Container>
    );
}
export default Profile;

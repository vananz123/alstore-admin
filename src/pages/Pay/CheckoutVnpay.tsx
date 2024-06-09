import queryString from 'query-string';
import { useEffect } from 'react';
import { Button, Result } from 'antd';
import Container from '@/conponents/Container';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { loadCartDetail } from '@/app/feature/cart/action';
function CheckoutVnpay() {
    const user = useAppSelector(selectUser).data
    const p = queryString.parse(window.location.search);
    console.log(p)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(user){
           dispatch(loadCartDetail({userId:user.id}))
        }
    },[dispatch,user]);
    return (
        <Container>
            <Result
                status={p.Success === "True" ? 'success' : 'warning'}
                title="Thông tin đơn hàng!"
                subTitle={p.Message}
                extra={[
                    <Button type="primary" key="console" onClick={()=>{navigate('/order')}}>
                    Chi tiết đơn hàng
                </Button>,
                <Button key="buy" onClick={()=>{navigate('/home')}}>Trang chủ</Button>,
                ]}
            />
        </Container>
    );
}

export default CheckoutVnpay;

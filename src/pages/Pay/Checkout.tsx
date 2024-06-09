
import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadCartDetail } from '@/app/feature/cart/action';
import { selectUser } from '@/app/feature/user/reducer';
import Container from '@/conponents/Container';
function Checkout() {
    const {id} = useParams()
    const [content,setContent] = React.useState<string>('')
    const user = useAppSelector(selectUser).data
    const [status,setStatus] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(id != undefined && user){
           dispatch(loadCartDetail({userId:user.id}))
            setStatus(true)
            setContent("Bạn đã đặt hàng thành công, vui lòng kiểm trả hàng trước khi thanh toán!")
        }
    },[dispatch,id]);
    return (
        <Container><Result
        status={status ? 'success' : 'warning'}
        title="Thông tin đơn hàng!"
        subTitle={content}
        extra={[
            <Button type="primary" key="console" onClick={()=>{navigate('/order')}}>
                Chi tiết đơn hàng
            </Button>,
            <Button key="buy" onClick={()=>{navigate('/home')}}>Trang chủ</Button>,
        ]}
    /></Container>
    );
}

export default Checkout;

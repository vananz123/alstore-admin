import { Col, Layout, Row, Space } from 'antd';
import { Flex, Tag } from 'antd';
import Container from '@/conponents/Container';
import React from 'react';
const { Footer } = Layout;
import Logo2 from '/logo.png';
const FooterC = React.memo( ()=> {
    return (
        <Container>
            <Footer className='text-center border-t-[1px] border-[#858585] p-2 md:p-5' >
                <Row gutter={[8, 8]} align={'top'} justify={'start'}>
                    <Col xs={24} md={24} lg={8} xl={6}>
                        <div className='text-left w-full lg:w-[80%] text-stone-500'>
                            <img
                                style={{ width: '100px', marginLeft: '0px', opacity: 1 }}
                                src={Logo2}
                                alt="la store"
                            />
                            <p className='p-0 m-[4px] text-stone-500'>
                                © 2017 Công Ty Cổ Phần Vàng Bạc Đá Quý Phú Nhuận
                            </p>
                            <div className='p-[5px] m-0 text-stone-500'>
                                <p className='p-0 m-0 text-stone-500'>170E Phan Đăng Lưu, P.3, Q.Phú Nhuận, TP.Hồ Chí Minh</p>
                                ĐT:{' '}
                                <a href="tel:0356636960" style={{ color: 'blue' }}>
                                    0356636960
                                </a>{' '}
                                - Fax:{' '}
                                <a href="fax:02839951702" style={{ color: 'blue' }}>
                                    028 3995 1702
                                </a>
                                <p className='p-0 m-0 text-stone-500'>
                                    <a
                                        style={{ color: 'blue' }}
                                        href="https://cdn.pnj.io/images/quan-he-co-dong/2024/8c-20240131-PNJ-GCNDKDN-lan-36-CBTT.pdf"
                                        rel="nofollow noopener"
                                    >
                                        Giấy chứng nhận đăng ký doanh nghiệp: 0300521758
                                    </a>{' '}
                                    do Sở Kế hoạch &amp; Đầu tư TP.HCM cấp lần đầu ngày 02/01/2004.{' '}
                                    <a
                                        href="https://cdn.pnj.io/images/quan-he-co-dong/2022/1d-Nganh-nghe-kinh-doanh-tai-ngay-06012022-CBTT.pdf"
                                        rel="nofollow noopener"
                                        style={{ color: 'blue' }}
                                    >
                                        Ngành, nghề kinh doanh
                                    </a>
                                </p>
                            </div>
                            <div className='p-[5px] m-0 text-stone-500'>
                                <p className='p-0 m-0 text-stone-500'>
                                    Email:{' '}
                                    <a href="mailto: 2051052074linh@ou.edu.vn" style={{ color: 'blue' }}>
                                        2051052074linh@ou.edu.vn
                                    </a>
                                    Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi) Gọi mua:{' '}
                                    <a href="tel:1800545457" style={{ color: 'blue' }}>
                                        1800545457
                                    </a>{' '}
                                    (phím 1) Khiếu nại:{' '}
                                    <a href="tel:1800545457" style={{ color: 'blue' }}>
                                        1800545457
                                    </a>{' '}
                                    (phím 2)
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={6}>
                        <div className='flex justify-between' >
                            <Space direction="vertical" align="start">
                                <h3 className='text-left font-bold'>KẾT NỐI VỚI CHÚNG TÔI</h3>
                                <Flex gap="4px 0" wrap="wrap">
                                    <Tag className="footer-tag">
                                        <a href="https://www.youtube.com/@HoChiMinhCityOpenUniversity" target="_blank">
                                            <i className="footer-tag__i">
                                                <img
                                                    style={{ opacity: 1 }}
                                                    className="img-lazyload"
                                                    data-src=""
                                                    alt="Youtube"
                                                    src="https://cdn.pnj.io/images/image-update/footer/youtube.svg"
                                                ></img>
                                            </i>
                                        </a>
                                    </Tag>
                                    <Tag className="footer-tag">
                                        <a
                                            href="https://www.facebook.com/profile.php?id=100027662470361"
                                            target="_blank"
                                        >
                                            <i className="footer-tag__i">
                                                <img
                                                    style={{ opacity: 1 }}
                                                    className="img-lazyload"
                                                    data-src=""
                                                    alt="Facebook"
                                                    src="https://cdn.pnj.io/images/image-update/footer/facebook.svg"
                                                ></img>
                                            </i>
                                        </a>
                                    </Tag>
                                    <Tag className="footer-tag">
                                        <a
                                            href="https://www.facebook.com/profile.php?id=100027662470361"
                                            target="_blank"
                                        >
                                            <i className="footer-tag__i">
                                                <img
                                                    style={{ opacity: 1 }}
                                                    className="img-lazyload"
                                                    data-src=""
                                                    alt="Instagram"
                                                    src="https://cdn.pnj.io/images/image-update/footer/instagram.svg"
                                                ></img>
                                            </i>
                                        </a>
                                    </Tag>
                                    <Tag className="footer-tag">
                                        <a href="mailto:2051052074linh@ou.edu.vn" target="_blank">
                                            <i className="footer-tag__i">
                                                <img
                                                    style={{ opacity: 1 }}
                                                    className="img-lazyload"
                                                    data-src=""
                                                    alt="Instagram"
                                                    src="https://cdn.pnj.io/images/image-update/footer/email.svg"
                                                ></img>
                                            </i>
                                        </a>
                                    </Tag>
                                </Flex>
                                <h3 className='text-left font-bold'>
                                    QUAN TÂM THÌ HÃY KẾT NỐI ZALO
                                </h3>
                                <p style={{ textAlign: 'left', padding: 0 }}>Nhận các thông tin khuyến mãi hấp dẫn</p>
                                <div style={{ textAlign: 'left', padding: 0, margin: 0 }}>
                                    <a href="https://zalo.me/0356636960" target="_blank">
                                        <i className="footer-tag__i">
                                            <img
                                                style={{ opacity: 1 }}
                                                className="img-lazyload"
                                                data-src=""
                                                alt="Instagram"
                                                src="https://file.hstatic.net/200000722513/file/icon_zalo__1__f5d6f273786c4db4a3157f494019ab1e.png"
                                            ></img>
                                        </i>
                                    </a>
                                    <a href="mailto:2051052074linh@ou.edu.vn" target="_blank">
                                        <i style={{ display: 'inline-block', width: '100px' }}>
                                            <img
                                                style={{ opacity: 1 }}
                                                className="img-lazyload"
                                                data-src=""
                                                alt="Đã thông báo bộ công thương"
                                                src="https://theme.hstatic.net/200000722513/1001090675/14/logo-bct.png?v=5339"
                                            ></img>
                                        </i>
                                    </a>
                                </div>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={6}>
                        <div className='flex justify-between text-center'>
                            <Space className='w-full lg:w-[80%]' direction="vertical" align="start">
                                <h3 className='text-left font-bold'>CÁCH THỨC THANH TOÁN</h3>
                                <div>
                                    <ul style={{ display: 'flex' }}>
                                        <li>
                                            <img
                                                srcSet="https://theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=5339"
                                                alt="banking"
                                            />
                                        </li>
                                        <li>
                                            <img
                                                srcSet="https://theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=5339"
                                                alt="Tiền mặt"
                                            />
                                        </li>
                                        <li>
                                            <img
                                                srcSet="https://theme.hstatic.net/200000722513/1001090675/14/pay_6.png?v=5339"
                                                alt="Trả góp 0%"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <iframe
                                    className='h-[250px] border-0 mt-2'
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.133333259392!2d106.67948837593282!3d10.801098589349179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528da01ab9bbd%3A0xb58371e9e12a0df4!2zQ1RDUCBWw6BuZyBC4bqhYyDEkMOhIFF1w70gUE5KIFBow7ogTmh14bqtbg!5e0!3m2!1svi!2s!4v1716720996583!5m2!1svi!2s"
                                ></iframe>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={6}>
                        <div className='flex justify-between text-center'>
                            <Space direction="vertical" align="start">
                                <h3 className='text-left font-bold'>PHẢN HỒI, GÓP Ý, KHIẾU NẠI</h3>
                                <div>
                                    <p className='text-left mt-[5px] text-stone-500'>
                                        Phản hồi nóng về chất lượng sản phẩm và dịch vụ. Đội ngũ Kiểm Soát Chất Lượng
                                        của chúng tôi sẵn sàng lắng nghe quý khách.
                                    </p>
                                </div>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Footer>
        </Container>
    );
})

export default FooterC;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic, Typography } from 'antd';
import CountUp from 'react-countup';
import * as statisticServices from '@/api/statisticServices';
import { Area } from '@ant-design/plots';
import { ProductItemStatisc } from '@/type';
const { Paragraph } = Typography;
const formatter: StatisticProps['formatter'] = (value) => <CountUp end={value as number} separator="," />;
function Home() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [analysis, setAnalysis] = React.useState<any>();
    const [productItem, setProductItem] = React.useState<ProductItemStatisc[]>();
    const [data, setData] = React.useState<any[]>([]);
    const getData = async () => {
        const res = await statisticServices.getSaleOfDate();
        const res1 = await statisticServices.getAnalysis();
        const res2 = await statisticServices.getProductItemSaleTop();
        console.log(res2);
        setData(res.resultObj);
        setAnalysis(res1.resultObj);
        setProductItem(res2.resultObj);
    };
    useEffect(() => {
        getData();
    }, []);
    const config = {
        data,
        xField: 'day',
        yField: 'sales',
    };
    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Tổng Doanh Thu" value={analysis?.totalSales} formatter={formatter} />
                </Col>
                <Col span={8}>
                    <Statistic title="Tổng Số Đơn" value={analysis?.totalOrder} precision={2} formatter={formatter} />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Tổng Sản Phẩm"
                        value={analysis?.totalProduct}
                        precision={2}
                        formatter={formatter}
                    />
                </Col>
            </Row>

            <Area {...config} />
            <div>
                <div>
                    <p>Top sale</p>
                </div>
                <div>
                    {productItem &&
                        productItem.length > 0 &&
                        productItem.map((item,index) => (
                            <div key={item.id} style={{ display: 'flex', alignItems:'center', gap:5}}>
                                <p>{index+1}</p>
                                <div style={{ width: 100, height: 100 }}>
                                    <img
                                        style={{ width: '100%', height: '100%' }}
                                        src={baseUrl + item.urlThumbnailImage}
                                    />
                                </div>
                                <div>
                                    <Paragraph
                                        ellipsis={{
                                            rows: 1,
                                        }}
                                    >
                                        {item.seoTitle}
                                    </Paragraph>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

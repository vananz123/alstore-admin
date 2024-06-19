/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { GetProps, StatisticProps } from 'antd';
import { Col, Empty, Row, Statistic, Typography } from 'antd';
import CountUp from 'react-countup';
import * as statisticServices from '@/api/statisticServices';
import { Column } from '@ant-design/plots';
import { useAppSelector } from '@/app/hooks';
import { selectDepartment } from '@/app/feature/department/reducer';
const { Paragraph } = Typography;
import { DatePicker } from 'antd';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
const timeMonth = new Date(Date.now());
timeMonth.setMonth(timeMonth.getMonth() - 1);
const { RangePicker } = DatePicker;
const dateRan = {
    dateB: timeMonth,
    dateE: new Date(Date.now()),
};
import customParseFormat from 'dayjs/plugin/customParseFormat';
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current > dayjs().endOf('day');
};
const dateFormat = 'MM-DD-YYYY';
const formatter: StatisticProps['formatter'] = (value) => <CountUp end={value as number} separator="," />;
function Home() {
    const { selected } = useAppSelector(selectDepartment);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [dateBegin, setDateBegin] = React.useState<Date>(dateRan.dateB);
    const [dateEnd, setDateEnd] = React.useState<Date>(dateRan.dateE);
    const { data } = useQuery({
        queryKey: [`get-sale-of-date-${selected}-${dateBegin}-${dateEnd}`],
        queryFn: () => statisticServices.getSaleOfDate(selected, dateEnd, dateBegin),
        enabled: selected !== 0 && dateBegin < dateEnd,
    });
    const { data: productTopSale } = useQuery({
        queryKey: [`get-sale-top`],
        queryFn: () => statisticServices.getProductItemSaleTop(),
    });
    const { data: analysis } = useQuery({
        queryKey: [`get-analysis-${selected}`],
        queryFn: () => statisticServices.getAnalysis(selected),
    });
    const config = {
        data,
        xField: 'day',
        yField: 'sales',
    };
    const onChange = (date: any, dateString: string | string[]) => {
        console.log(date, dateString);
        setDateBegin(date[0]);
        setDateEnd(date[1]);
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
            <div className="mt-3">
                <RangePicker
                    defaultValue={[
                        dayjs(dayjs(dateBegin).format('MM/DD/YYYY'), dateFormat),
                        dayjs(dayjs(dateEnd).format('MM/DD/YYYY'), dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={onChange}
                    disabledDate={disabledDate}
                />
            </div>
            <div>
                <div>{data && data.length > 0 ? <Column {...config} /> : <Empty />}</div>
                <div>
                    <p>Top sale</p>
                    {productTopSale &&
                        productTopSale.length > 0 &&
                        productTopSale.map((item, index) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <p>{index + 1}</p>
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

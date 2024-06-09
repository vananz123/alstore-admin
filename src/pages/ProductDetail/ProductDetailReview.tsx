import { Review } from '@/api/ResType';
import { useQuery } from '@tanstack/react-query';
import { Card, Pagination, Rate } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import * as reviewServices from '@/api/reviewServices';
import Container from '@/conponents/Container';
interface Props {
    productId: number;
}
const ProductDetailReview: React.FC<Props> = React.memo(({ productId }) => {
    const [page, setPage] = React.useState<number>(1);
    const { data: pagingReview } = useQuery({
        queryKey: [`product-detail-review-${productId}-${page}`],
        queryFn: () => reviewServices.getReivewByProductId(productId, page),
    });
    const onChange = (currentPage: number) => {
        setPage(currentPage);
    };
    return (
        <section>
            <Container className="mt-5 mb-0">
                <div className="flex justify-start">
                    <p className="text-[18px] font-bold">Bình luận từ khách hàng</p>
                </div>
            </Container>
            <Container className='mb-5 mt-0'>
                <div className="flex flex-col gap-5 sm:p-5">
                    {pagingReview && pagingReview.items.length > 0 ? (
                        <>
                            <p>{pagingReview?.totalRecords} đánh giá</p>
                            {pagingReview.items.map((e: Review) => (
                                <div key={e.id} className="rounded w-full p-5 bg-[#fafafa]">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-base">{e.user.userName}</p>
                                            <p>{dayjs(e.createAt).format('YYYY-MM-DD')}</p>
                                        </div>
                                        <Rate value={e.rate} disabled />
                                        <p>{e.comment}</p>
                                    </div>
                                    {e.feelback !== null && (
                                        <>
                                            <p className="mt-8">Phản hồi</p>
                                            <Card key={e.id} type="inner" style={{ width: '100%', marginTop: 16 }}>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex justify-between">
                                                        <p className="font-bold text-base">LA Store</p>
                                                        <p>{dayjs(e.feelbackAt).format('YYYY-MM-DD')}</p>
                                                    </div>
                                                    <p>{e.feelback}</p>
                                                </div>
                                            </Card>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <div className="rounded w-full p-5 bg-[#fafafa]">
                                <div className="mb-4">
                                    <Rate disabled={true} />
                                </div>
                                <p className="font-bold text-base">Chưa có đánh giá</p>
                            </div>
                        </>
                    )}
                </div>
                {pagingReview && pagingReview.pageCount > 1 && (
                    <>
                        <div className="text-center mt-5">
                            <Pagination
                                onChange={onChange}
                                current={page}
                                pageSize={3}
                                total={pagingReview?.totalRecords}
                            />
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
});

export default ProductDetailReview;

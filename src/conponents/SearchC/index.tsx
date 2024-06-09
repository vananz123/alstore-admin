/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from '@/hooks';
import { Button, Input, Popover } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, {  memo, useEffect, useRef } from 'react';
import { Product } from '@/type';
import { Link, useNavigate } from 'react-router-dom';
import { Filter } from '@/type';
import ProductCard from '../ProductCard';
const SearchC: React.FC = memo(() => {
    const { Search } = Input;
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();
    const [data, setData] = React.useState<Product[]>();
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 1000 });
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            navigate(`/product/${value}`);
        }
        if (info?.source == 'clear') {
            setData([]);
        }
    };
    const onChangeInput: SearchProps['onChange'] = (value) => {
        setSearchValue(value.target.value);
    };
    useEffect(() => {
        const Search = async () => {
            if (debounce != '') {
                const filter: Filter = {
                    page: 1,
                    pageSize: 5,
                    sortOder: 'ascending',
                    productName: debounce?.toString(),
                };
                const result = await productServices.getProductPagingByFilter(filter);
                if (result.isSuccessed === true) {
                    setData(result.resultObj.items);
                }
            }
        };
        Search();
    }, [debounce]);
    return (
        <>
            <div>
                <Popover
                    content={
                        <div className='popover-search'>
                            {data && data.length > 1 ? (
                                <>
                                    {data.map((e: Product) => (
                                        <div className='mb-2' key={e.id}>
                                            <ProductCard product={e} type='forList'/>
                                        </div>
                                    ))}
                                    <div className='w-full text-center'>
                                        <Button>
                                            <Link to={`/product/${searchValue}`}>Hiển thị tất cả</Link>
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center' }}>Not found</div>
                            )}
                        </div>
                    }
                    title={'Tìm kiếm'}
                    trigger={'click'}
                    placement='bottom'
                >
                    <div className='mt-1 w-auto'>
                        <Search
                            placeholder="Tên sản phẩm"
                            className='block'
                            allowClear
                            autoFocus={false}
                            ref={inputRef}
                            size="middle"
                            onSearch={onSearch}
                            onChange={onChangeInput}
                        />
                    </div>
                </Popover>
            </div>
        </>
    );
});
export default SearchC;

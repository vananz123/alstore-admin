import CategoryForm from '@/conponents/CategoryForm';
import React, { useEffect } from 'react';
import { Category } from '@/type';
import { StatusForm } from '@/type';
import { useNavigate } from 'react-router-dom';
import useNotification from '@/hooks/useNotification';
function CategoryAdd() {
    const [category, setCategory] = React.useState<Category>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const Navigate =useNavigate()
    const {contextHolder, openNotification} = useNotification()
    useEffect(() => {
        if (status == 'success') {
            if (category != undefined) {
                //dispatch(loadCategories());
                openNotification('success');
                Navigate('/category')
            }
        }
        if (status == 'error') {
            openNotification('error');
        }
        setStatus('loading');
        setCategory(undefined)
    }, [status]);

    return (
        <>
            {contextHolder}
            <CategoryForm category={category} onSetState={setCategory} onSetStatus={setStatus} />
        </>
    );
}

export default CategoryAdd;
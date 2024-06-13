import ProductForm from '@/conponents/ProductForm';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
function ProductAdd() {
    const navigate = useNavigate();
    const product = undefined;
    return (
        <div>
            <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    size="small"
                    style={{ marginBottom: '10px' }}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Quay lại
                </Button>
            <ProductForm product={product} refetch={()=> {}}/>
        </div>
    );
}

export default ProductAdd;
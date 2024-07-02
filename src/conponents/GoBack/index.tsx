import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function GoBack() {
    const navigate = useNavigate();
    return (
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
    );
}

export default GoBack;

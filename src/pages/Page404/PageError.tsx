import Container from '@/conponents/Container';
import { Result } from 'antd';
function PageError() {
    return (
        <Container>
            <Result status="403" title="Error" subTitle="Sorry, Asscent ." />
        </Container>
    );
}

export default PageError;

import Container from "@/conponents/Container";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function Page404() {
    return <Container>
    return   <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={'/'}><Button type="primary">Back Home</Button></Link>}
    />
    return </Container>;
}

export default Page404;
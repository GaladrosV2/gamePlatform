import withAuth from "../lib/withAuth";
import Layout from "../components/Layout";
import User from "../components/User";
import { Col, Row } from "antd";

const character = () => {
  return (
    <Layout>
      <Row>
        <Col span={24}>
          <User />
        </Col>
      </Row>
    </Layout>
  );
};

export default withAuth(character);

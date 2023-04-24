import withAuth from "../lib/withAuth";
import Layout from "../components/Layout";
import Creator from "../components/Creator";
import { Col, Row } from "antd";

const Kreator = () => {
  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Creator />
        </Col>
      </Row>
    </Layout>
  );
};

export default withAuth(Kreator);

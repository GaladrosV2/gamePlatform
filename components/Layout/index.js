import { Col, Row } from "antd";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col span={18}></Col>
        <Col span={6}>
          <Sidebar />
        </Col>
      </Row>
    </>
  );
};

export default Layout;

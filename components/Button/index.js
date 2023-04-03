import React from "react";
import { Button, Space } from "antd";

const App = ({ children }) => (
  <Space wrap>
    <Button type="primary">{children}</Button>
  </Space>
);

export default App;

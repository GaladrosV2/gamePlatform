import React from "react";
import { Button, Space, Shape } from "antd";

const CustomButton = ({ children, ...props }) => (
  <Space wrap>
    <Button type="primary" {...props}>
      {children}
    </Button>
  </Space>
);

export default CustomButton;

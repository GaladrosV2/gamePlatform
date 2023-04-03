import React from "react";
import { Col, Row } from "antd";
import Link from "next/link";

import LogoutButton from "../LogoutButton";

import header from "./header.module.scss";

const Header = () => {
  return (
    <Row>
      <Col span={16}>
        <Link className={header.header__logo} href="/">
          TGF
        </Link>
      </Col>
      <Col span={8}>
        <div className={header.header__nav}>
          <Link className={header["header__nav-item"]} href="/postac">
            Postać
          </Link>
          <Link className={header["header__nav-item"]} href="/tavern">
            Karczmy
          </Link>
          <Link className={header["header__nav-item"]} href="/sesje">
            Sesje
          </Link>
          <LogoutButton className={header["header__nav-item"]} />
        </div>
      </Col>
    </Row>
  );
};

export default Header;

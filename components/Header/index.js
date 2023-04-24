import React from "react";
import { Col, Row } from "antd";
import Link from "next/link";

import LogoutButton from "../LogoutButton";

import header from "./header.module.scss";

const Header = () => {
  return (
    <header className={header.header}>
      <Row>
        <Col span={17}>
          <Link className={header.header__logo} href="/">
            TGF
          </Link>
        </Col>
        <Col span={7}>
          <div className={header.header__nav}>
            <Link className={header["header__nav-item"]} href="/character">
              Postać
            </Link>
            <Link className={header["header__nav-item"]} href="/taverns">
              Karczmy
            </Link>
            <Link className={header["header__nav-item"]} href="/sesje">
              Sesje
            </Link>
            <LogoutButton className={header["header__nav-item"]} />
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;

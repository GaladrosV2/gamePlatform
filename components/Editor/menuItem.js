import React from "react";
import withAuth from "../../pages/api/withAuth";
import "remixicon/fonts/remixicon.css";

import menuItem from "./menuItem.module.scss";
import Button from "../Button/index";

const MenuItem = (props) => {
  const { icon, title, action } = props;
  const isActive = null;
  return (
    <Button
      className={`${menuItem.menuItem}${
        isActive && isActive() ? " is-active" : ""
      } `}
      onClick={action}
      title={title}
    >
      <i className={"ri-" + icon}></i>
    </Button>
  );
};
export default withAuth(MenuItem);

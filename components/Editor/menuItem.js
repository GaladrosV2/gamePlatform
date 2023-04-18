import React from "react";
import "remixicon/fonts/remixicon.css";

import menuItem from "./menuItems.module.scss";
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
export default MenuItem;

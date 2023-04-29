import React from "react";
import "remixicon/fonts/remixicon.css";

import menuItem from "./menuItems.module.scss";
import CustomButton from "../Button";

const MenuItem = (props) => {
  const { icon, title, action } = props;
  const isActive = null;
  return (
    <CustomButton
      className={`${menuItem.menuItem}${
        isActive && isActive() ? " is-active" : ""
      } `}
      onClick={action}
      title={title}
    >
      <i className={"ri-" + icon}></i>
    </CustomButton>
  );
};
export default MenuItem;

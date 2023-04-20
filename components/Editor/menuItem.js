import React from "react";
// import "remixicon/fonts/remixicon.css";
import "@ant-design/icons";
import menuItem from "./menuItems.module.scss";
import Button from "../Button/index";

const MenuItem = ({ icon, title, action, isActive }) => {
  console.log(icon);
  return (
    <Button
      className={`${menuItem.menuItem}${
        isActive && isActive() ? " is-active" : ""
      } `}
      onClick={action}
      title={title}
    >
      {icon}
    </Button>
  );
};
export default MenuItem;

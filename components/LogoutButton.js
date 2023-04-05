import React from "react";
import { signOut } from "next-auth/react";
import AntdButtonWrapper from "./Button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return <AntdButtonWrapper onClick={handleLogout}>Logout</AntdButtonWrapper>;
};

export default LogoutButton;

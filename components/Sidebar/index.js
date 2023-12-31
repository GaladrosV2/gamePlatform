import DiceRoller from "../Dices";
import UsersOnline from "../UsersOnline/index";

import sidebar from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={sidebar.wrapper}>
      <UsersOnline />
      <DiceRoller />
    </div>
  );
};

export default Sidebar;

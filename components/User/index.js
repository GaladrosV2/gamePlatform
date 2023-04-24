import { useEffect, useState } from "react";
import databaseFetch from "../../lib/databaseFetch";
import useUser from "../../hooks/useUser";

import user from "./user.module.scss";

const User = () => {
  const this_user = useUser();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    async function loadData() {
      const data = await databaseFetch({
        model: "Characters",
        action: "findUnique",
        where: { id: this_user.id },
      });
      setCharacter(data[0]);
    }
    if (this_user) loadData();
  }, [this_user]);

  return (
    <div className={user.user__wrapper}>
      <h2>Profil</h2>
      <p>Witaj {character?.name ? character?.name : "nieznajomy"}!</p>
    </div>
  );
};

export default User;

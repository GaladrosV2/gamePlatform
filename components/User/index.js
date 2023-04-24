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
        where: { userId: this_user.id },
        action: "findUnique",
      });
      console.log(this_user.id);

      setCharacter(data);
    }

    if (this_user) {
      loadData();
    }
  }, [this_user]);

  return (
    <div className={user.user__wrapper}>
      <h1>Witaj, {this_user ? this_user.name : "Stranger"}!</h1>
      <p>Twoja postać to:</p>
      <ul>
        {character.name && <li>Imię: {character.name}</li>}
        {character.age && <li>Wiek: {character.age}</li>}
        {character.class && <li>Klasa: {character.class}</li>}
      </ul>
    </div>
  );
};

export default User;

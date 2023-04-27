import { useEffect, useState } from "react";
import databaseFetch from "../../lib/databaseFetch";
import useUser from "../../hooks/useUser";

import user from "./user.module.scss";

const User = () => {
  const this_user = useUser();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await databaseFetch({
        model: "Characters",
        where: {
          userId: this_user.id,
        },
        action: "findMany",
      });
      setCharacters(data);
    }

    if (this_user) {
      loadData();
    }
  }, [this_user]);

  return (
    <div className={user.user__wrapper}>
      <h1>Witaj, {this_user ? this_user.name : ""}!</h1>
      <p>Twoje postacie to:</p>

      <ul>
        {characters.map((character) => (
          <li className={user.character} key={character.id}>
            <p>Imię: {character.name}</p>
            <p>Wiek: {character.age}</p>
            <p>Klasa: {character.class}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useUser from "../../hooks/useUser";
import databaseFetch from "../../lib/databaseFetch";

import classes from "./classes/classes";
import AntdButtonWrapper from "../Button";

import styles from "./creator.module.scss";

const Creator = () => {
  const this_user = useUser();
  const router = useRouter();
  let [userCharacter, setUserCharacter] = useState({
    userId: "",
    name: "",
    age: "",
    class: "",
  });

  const characterClass = classes[userCharacter.class];

  useEffect(
    (this_user) => {
      if (this_user) {
        setUserCharacter({
          userId: this_user.id,
          name: "",
          age: "",
          class: "",
        });
      }
    },
    [this_user]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserCharacter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setUserCharacter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const logCharacter = async (event) => {
    if (userCharacter) {
      event.preventDefault();
      router.push("/character");

      const character = await databaseFetch({
        model: "Characters",
        action: "create",
        data: {
          userId: userCharacter.userId,
          name: userCharacter.name,
          age: userCharacter.age,
          class: userCharacter.class,
        },
      });
    }
  };

  return (
    <section className={styles.creatorSection}>
      <form className={styles.creatorForm}>
        <div className={styles.creatorRecord}>
          <label htmlFor="name">Wybierz imię:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userCharacter.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.creatorRecord}>
          <label htmlFor="age">Wybierz wiek:</label>
          <input
            type="number"
            min={15}
            max={100}
            id="age"
            name="age"
            value={userCharacter.age}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.creatorRecord}>
          <label htmlFor="class">Wybierz profesję:</label>
          <select
            id="class"
            name="class"
            value={userCharacter.class}
            onChange={handleSelectChange}
          >
            <option value=""></option>
            <option value="warrior">Wojownik</option>
            <option value="craftsman">Rzemieślnik</option>
            <option value="thief">Łotrzyk</option>
            <option value="mage">Mag</option>
            <option value="alchemist">Alchemik</option>
          </select>
        </div>
        <AntdButtonWrapper
          type="submit"
          className={styles.submitButton}
          onClick={logCharacter}
        >
          Stwórz postać
        </AntdButtonWrapper>
      </form>

      <div>{characterClass}</div>
    </section>
  );
};

export default Creator;

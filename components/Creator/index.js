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

  const [invalidAge, setInvalidAge] = useState(false);
  const [tooLong, setTooLong] = useState(false);

  let [userCharacter, setUserCharacter] = useState({
    userId: "",
    name: "",
    age: "",
    class: "",
  });
  const characterClass = classes[userCharacter.class];

  useEffect(() => {
    if (this_user) {
      setUserCharacter({
        userId: this_user.id,
      });
    }
  }, [this_user]);

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

      // Age/name is not within the accepted range, so display an error message.
      if (
        parseInt(userCharacter.age) < 16 ||
        parseInt(userCharacter.age) > 70
      ) {
        console.log("Invalid age entered");
        setInvalidAge(true);
        return;
      } else if (userCharacter.name.length > 32) {
        console.log("Too long name entered");
        setTooLong(true);
        return;
      }

      router.push("/character");

      const createCharacter = await databaseFetch({
        model: "Characters",
        action: "create",

        data: {
          userId: userCharacter.userId,
          name: userCharacter.name,
          age: parseInt(userCharacter.age),
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
            maxLength={32}
            value={userCharacter.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.creatorRecord}>
          <label htmlFor="age">Wybierz wiek:</label>
          <input
            type="number"
            placeholder="16-70"
            min={16}
            max={70}
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

        {invalidAge && (
          <div>
            <p>Minimalny wiek postaci 16 Maxymalny 70</p>
          </div>
        )}

        {tooLong && (
          <div>
            <p>Ta nazwa postaci to przesada...</p>
          </div>
        )}

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

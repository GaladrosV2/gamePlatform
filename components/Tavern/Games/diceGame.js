import React, { useState } from "react";
import AntdButtonWrapper from "../../Button";
import games from "./games.module.scss";

const DiceGame = () => {
  const [userResult, setUserResult] = useState(null);
  const [tavResult, setTavResult] = useState(null);

  const handlePlay = () => {
    setUserResult(rollDices());
    setTavResult(rollDices());
  };

  const rollDices = () => {
    const newDice = Array.from(
      { length: 5 },
      () => Math.floor(Math.random() * 6) + 1
    );
    return { raw: newDice, ...calcOutcome(newDice) };
  };

  const calcOutcome = (newDice) => {
    const counts = newDice.reduce((obj, value) => {
      obj[value] = (obj[value] || 0) + 1;
      return obj;
    }, {});

    const outcomes = [
      {
        condition: () =>
          JSON.stringify([2, 3, 4, 5, 6]) === JSON.stringify(newDice.sort()),
        rank: 8,
        name: "Duży Strit",
      },
      {
        condition: () =>
          JSON.stringify([1, 2, 3, 4, 5]) === JSON.stringify(newDice.sort()),
        rank: 7,
        name: "Mały Strit",
      },

      {
        condition: () =>
          Object.values(counts).filter((count) => count === 3).length === 1 &&
          Object.values(counts).filter((count) => count === 2).length === 1,
        rank: 6,
        name: "Full",
      },
      {
        condition: () =>
          Object.values(counts).filter((count) => count === 5).length === 1,
        rank: 5,
        name: "Poker",
      },
      {
        condition: () =>
          Object.values(counts).filter((count) => count === 4).length === 1,
        rank: 4,
        name: "Kareta",
      },
      {
        condition: () =>
          Object.values(counts).filter((count) => count === 3).length === 1,
        rank: 3,
        name: "Trójka",
      },
      {
        condition: () =>
          Object.values(counts).filter((count) => count === 2).length === 2,
        rank: 2,
        name: "Dwie Pary",
      },
      {
        condition: () =>
          Object.values(counts).filter((count) => count === 2).length === 1,
        rank: 1,
        name: "Para",
      },
    ];

    const outcome = outcomes.find((o) => o.condition());
    return outcome
      ? { rank: outcome.rank, name: outcome.name }
      : { rank: 0, name: "Nic" };
  };

  const compareResults = () => {
    if (userResult.rank > tavResult.rank) return <h2>Wygrywasz piwo</h2>;
    if (userResult.rank === tavResult.rank) return <h2>Remis</h2>;
    return <h2>Przegrywasz złocisza</h2>;
  };

  return (
    <div className={games.diceGame}>
      <h1>Gra w kości</h1>
      <AntdButtonWrapper onClick={handlePlay}>Rzuć kośćmi</AntdButtonWrapper>
      {userResult && tavResult ? (
        <div className={games.diceContainer}>
          <h2>Wyrzuciłeś:</h2>
          {userResult.name}
          <div>
            {userResult.raw.map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </div>
          <h2>Tawerna wyrzuciła:</h2>
          {tavResult.name}
          <div>
            {tavResult.raw.map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </div>
          {compareResults()}
        </div>
      ) : null}
    </div>
  );
};

export default DiceGame;

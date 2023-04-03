import React, { useState } from "react";
import Button from "../Button";

import dices from "./dices.module.scss";

const DiceRoller = () => {
  const [lastRoll, setLastRoll] = useState("");
  const [numDice, setNumDice] = useState(1);
  const [diceSide, setDiceSide] = useState(100);

  const handleNumDiceChange = (num) => {
    setLastRoll("");
    setNumDice(num);
  };

  const rollDice = (sides) => {
    let results = [];
    setDiceSide(sides);
    for (let i = 0; i < numDice; i++) {
      let roll = Math.floor(Math.random() * sides) + 1;
      results.push(roll);
    }
    setLastRoll(`${results.join(", ")}`);
  };

  return (
    <div className={dices.wrapper}>
      <div className={dices.buttons}>
        <Button onClick={() => rollDice(100)}>K100</Button>
        <Button onClick={() => rollDice(20)}>K20</Button>
        <Button onClick={() => rollDice(10)}>K10</Button>
        <Button onClick={() => rollDice(2)}>K2</Button>
      </div>
      <label className={dices.label}>
        <span>Liczba kości:</span>
        <Button onClick={() => handleNumDiceChange(Math.max(numDice - 1, 1))}>
          -
        </Button>
        <input
          className={dices.input}
          type="number"
          min="1"
          max="10"
          disabled
          value={numDice}
          onChange={handleNumDiceChange}
        />
        <Button onClick={() => handleNumDiceChange(Math.min(numDice + 1, 10))}>
          +
        </Button>
      </label>
      {lastRoll && (
        <div>
          Rzut kośćmi({numDice}) K{diceSide}:
          <p className={dices.roll}>{lastRoll}</p>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;

import React, { useState } from "react";
import CustomButton from "../Button";
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
        <CustomButton onClick={() => rollDice(100)}>K100</CustomButton>
        <CustomButton onClick={() => rollDice(20)}>K20</CustomButton>
        <CustomButton onClick={() => rollDice(10)}>K10</CustomButton>
        <CustomButton onClick={() => rollDice(2)}>K2</CustomButton>
      </div>
      <label className={dices.label}>
        <span>Liczba kości:</span>
        <CustomButton
          onClick={() => handleNumDiceChange(Math.max(numDice - 1, 1))}
        >
          -
        </CustomButton>
        <input
          className={dices.input}
          type="number"
          min="1"
          max="10"
          disabled
          value={numDice}
          onChange={handleNumDiceChange}
        />
        <CustomButton
          onClick={() => handleNumDiceChange(Math.min(numDice + 1, 10))}
        >
          +
        </CustomButton>
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

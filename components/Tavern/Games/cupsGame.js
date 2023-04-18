import React, { useState } from "react";
import AntdButtonWrapper from "../../Button";
import games from "./games.module.scss";

const CupsGame = () => {
  const [cups, setCups] = useState(generateCups());
  const [selectedCup, setSelectedCup] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  function generateCups() {
    const winningCup = Math.floor(Math.random() * 3);
    return [0, 0, 0].fill(1, winningCup, winningCup + 1);
  }

  const handleCupClick = (cupIndex) => {
    if (selectedCup === null) {
      setSelectedCup(cupIndex);
    } else {
      const newCups = [...cups];
      newCups[selectedCup] = 0;
      newCups[cupIndex] = 1;
      setCups(newCups);
      setSelectedCup(null);
      setHasWon(cupIndex === cups.indexOf(1));
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setCups(generateCups());
    setSelectedCup(null);
    setHasWon(false);
  };

  return (
    <div className={games.cupsGame}>
      <div className={games.cups}>
        {cups.map((cup, index) => (
          <div
            key={index}
            className={`${games.cup} ${cup ? games.selected : ""}`}
            onClick={() => handleCupClick(index)}
          />
        ))}
      </div>
      {showPopup && (
        <div className={games.popup}>
          <div className={games.popupContent}>
            {hasWon ? (
              <p>Wygrałeś darmowe piwo!</p>
            ) : (
              <p>Przegrałeś złocisza</p>
            )}
            <AntdButtonWrapper onClick={handlePopupClose}>
              Jeszcze raz!
            </AntdButtonWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CupsGame;

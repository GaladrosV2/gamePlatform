import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import DOMPurify from "isomorphic-dompurify";

import TiptapEditor from "../Editor";
import AntdButtonWrapper from "../Button";
import databaseFetch from "../../lib/databaseFetch";

import tavern from "./tavern.module.scss";

import CupsGame from "./Games/cupsGame";
import DicePoker from "./Games/diceGame";

const Tavern = ({}) => {
  // Defining several state variables that this component uses to manage its UI state
  const [editorValue, setEditorValue] = useState("");
  const this_user = useUser();
  const [status, setStatus] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [show3Cups, setShow3Cups] = useState(false);
  const [showDices, setShowDices] = useState(false);
  const [inn, setInn] = useState(null);
  //Defining connection with [tavern] database
  const willn = props.tavernId;
  useEffect(() => {
    fetchTavernData();
    console.log(fetchData);
    console.log(willn);
  }, []);

  async function fetchTavernData() {
    const data = await databaseFetch({
      model: "TavernMessages",
      action: "findMany",
    });
    setFetchData(data);
  }
  // Defining an async function that saves the value of the TiptapEditor component to the Prisma database
  // const saveEditorContent = async () => {
  //   const { error } = await databaseFetch({
  //     model: "TavernMessages",
  //     action: "create",
  //     data:{
  //       id: 1,
  //       tavern: ,
  //       tavernId: ,
  //       user: this_user,
  //       userId: this_user.id,
  //       message:,
  //     },
  //     })};

  //   if (error) {
  //     setStatus(error);
  //   } else {
  //     setStatus("Wiadomość wysłana");
  //   }
  // };
  // Defining several event handlers that toggle the 'showDescription', 'show3Cups', and 'showDices' state variables
  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };
  const handle3Cubs = () => {
    setShow3Cups(!show3Cups);
  };
  const handleDices = () => {
    setShowDices(!showDices);
  };
  // Rendering the main UI of this component
  return (
    <div className={tavern.tavernWrapper}>
      <div className={tavern.messageBoard}>
        <AntdButtonWrapper onClick={handleShowDescription}>
          {showDescription ? "Schowaj opis" : "Pokaż opis"}
        </AntdButtonWrapper>

        <AntdButtonWrapper onClick={handle3Cubs}>
          {show3Cups ? "Skończ grę" : "Graj w 3 kubki"}
        </AntdButtonWrapper>

        <AntdButtonWrapper onClick={handleDices}>
          {showDices ? "Skończ grę" : "Graj z karczmarzem w kości"}
        </AntdButtonWrapper>

        {showDescription && (
          <div className={tavern.description}>
            <p>{fetchData.map((table) => table.description)}</p>
          </div>
        )}

        {show3Cups && (
          <div className={tavern.gamesWrap}>
            <p>
              Kliknij dwa razy na kubek by sprawdzić swoje szczęście w grze.
            </p>
            <CupsGame />
          </div>
        )}

        {showDices && (
          <div className={tavern.gamesWrap}>
            <DicePoker />
          </div>
        )}

        {fetchData.map((message) => (
          <div
            key={message.id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                message.userId + ":" + message.message
              ),
            }}
          />
        ))}
      </div>
      <TiptapEditor onChange={(value) => setEditorValue(value)} />
      <AntdButtonWrapper
        onClick={() => {
          saveEditorContent();
          window.location.replace(window.location.href);
        }}
      >
        Wyślij
      </AntdButtonWrapper>
    </div>
  );
};

export default Tavern;

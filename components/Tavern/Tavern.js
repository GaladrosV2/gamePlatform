// Importing React and necessary hooks from the 'auth-helpers-react' and other files
import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import withAuth from "../../pages/api/withAuth";
import DOMPurify from "isomorphic-dompurify";
// Importing the Prisma client instance
import prisma from "../../lib/prisma";
// Importing the custom TiptapEditor and Button components
import TiptapEditor from "../Editor";
import Button from "../Button";
// Importing the styles for this component
import tavern from "./tavern.module.scss";
// Importing the two tavern games that this component renders
import CupsGame from "../TavernGames/cupsGame";
import DicePoker from "../TavernGames/diceGame";

// Defining the main Tavern component
const Tavern = (props) => {
  // Defining several state variables that this component uses to manage its UI state
  const [editorValue, setEditorValue] = useState("");
  const this_user = useUser();
  // const supabaseClient = useSupabaseClient();
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const [showDescription, setShowDescription] = useState(false);
  const [show3Cups, setShow3Cups] = useState(false);
  const [showDices, setShowDices] = useState(false);
  //Defining connection with [tavern] database
  const tavernData = props.props;

  // Defining an effect hook that loads data from a Supabase database when the 'status' state changes
  useEffect(() => {
    async function loadData() {
      const { data, error } = await prisma.TavernMessages.findMany();
      if (error) {
        console.log("error");
      } else {
        setData(data);
      }
    }
    loadData();
  }, [status]);

  // Defining an async function that saves the value of the TiptapEditor component to the Prisma database
  const saveEditorContent = async () => {
    const { error } = await prisma.tavernMessages.create({
      data: {
        tavernId: 1,
        userID: this_user.id,
        message: editorValue,
      },
    });

    if (error) {
      setStatus(error);
    } else {
      setStatus("Wiadomość wysłana");
    }
  };

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
        <Button onClick={handleShowDescription}>
          {showDescription ? "Schowaj opis" : "Pokaż opis"}
        </Button>

        <Button onClick={handle3Cubs}>
          {show3Cups ? "Skończ grę" : "Graj w 3 kubki"}
        </Button>

        <Button onClick={handleDices}>
          {showDices ? "Skończ grę" : "Graj z karczmarzem w kości"}
        </Button>

        {showDescription && (
          <div className={tavern.description}>
            <p>{tavernData.map((table) => table.TavernDescr)}</p>
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

        {data.map((message) => (
          <div
            key={message.id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                message.userID + ":" + message.message
              ),
            }}
          />
        ))}
      </div>
      <TiptapEditor onChange={(value) => setEditorValue(value)} />
      <Button
        onClick={() => {
          saveEditorContent();
          window.location.replace(window.location.href);
        }}
      >
        Wyślij
      </Button>
    </div>
  );
};

export default withAuth(Tavern);
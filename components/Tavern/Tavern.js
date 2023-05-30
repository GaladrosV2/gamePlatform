import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";

import useUser from "../../hooks/useUser";
import databaseFetch from "../../lib/databaseFetch";

import TiptapEditor from "../Editor";
import Button from "../Button";
import CupsGame from "./Games/cupsGame";
import DicePoker from "./Games/diceGame";

import tavern from "./tavern.module.scss";

const Tavern = ({ tavernData }) => {
	// Defining several state variables that this component uses to manage its UI state
	const [editorValue, setEditorValue] = useState("");
	const this_user = useUser();
	const [status, setStatus] = useState("");
	const [fetchData, setFetchData] = useState([]);
	const [showDescription, setShowDescription] = useState(false);
	const [show3Cups, setShow3Cups] = useState(false);
	const [showDices, setShowDices] = useState(false);
	const [showError, setShowError] = useState(false);
	const [editor, setEditor] = useState(null);

	// Defining an async function that loads the value from the database
	useEffect(() => {
		fetchTavernData();
	}, [status]);

	async function fetchTavernData() {
		const data = await databaseFetch({
			model: "TavernMessages",
			where: {
				tavernId: tavernData.id,
			},
			action: "findMany",
		});
		setFetchData(data);
	}

	// Defining an async function that saves the value of the TiptapEditor component to the Prisma database
	const saveEditorContent = async () => {
		if (editorValue.length >= 1) {
			const newMessage = await databaseFetch({
				model: "TavernMessages",
				action: "create",

				data: {
					tavernId: tavernData.id,
					userId: this_user.id,
					message: editorValue,
				},
			});

			if (editor) {
				editor.commands.clearContent(true);
			}
		} else {
			setShowError(true);
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
				<Button onClick={handleShowDescription}>{showDescription ? "Schowaj opis" : "Pokaż opis"}</Button>

				<Button onClick={handle3Cubs}>{show3Cups ? "Skończ grę" : "Graj w 3 kubki"}</Button>

				<Button onClick={handleDices}>{showDices ? "Skończ grę" : "Graj z karczmarzem w kości"}</Button>

				{showDescription && (
					<div className={tavern.description}>
						<p>{tavernData.description}</p>
					</div>
				)}

				{show3Cups && (
					<div className={tavern.gamesWrap}>
						<p>Kliknij dwa razy na kubek by sprawdzić swoje szczęście w grze.</p>
						<CupsGame />
					</div>
				)}

				{showDices && (
					<div className={tavern.gamesWrap}>
						<DicePoker />
					</div>
				)}

				{showError && <div className={tavern.tooShort}>Twoja wiadomość jest za krótka, postaraj się bardziej.</div>}

				{fetchData.map((message) => (
					<div
						key={message.id}
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize((this_user?.name ?? null) + ":" + message.message),
						}}
					/>
				))}
			</div>
			<TiptapEditor
				onChange={(value) => {
					setEditorValue(value);
				}}
				setEditor={setEditor}
			/>
			<Button onClick={saveEditorContent}>Wyślij</Button>
		</div>
	);
};

export default Tavern;

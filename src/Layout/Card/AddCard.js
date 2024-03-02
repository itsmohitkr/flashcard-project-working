import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { createCard, readDeck } from "../../utils/api";
import CardForm from "../Card/CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckAndCards() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }
    loadDeckAndCards();
    return () => abortController.abort();
  }, [deckId]);
  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, { front: front, back: back });
    setFront("");
    setBack("");
  };
  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Add Card</li>
      </ol>
      <h3>{deck.name}: Add Card</h3>
      <CardForm
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        deck={deck}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddCard;

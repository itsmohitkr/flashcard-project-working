import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { readCard, readDeck, updateCard} from "../../utils/api";
import CardForm from "../Card/CardForm";

function EditCard() {
     const [deck, setDeck] = useState([]);
     const [card, setCard] = useState([]);
     const [front, setFront] = useState("");
     const [back, setBack] = useState("");

    const { deckId, cardId } = useParams();
    const navigate = useNavigate();

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
     useEffect(() => {
       const abortController = new AbortController();
       async function loadCard() {
         try {
           const response = await readCard(cardId, abortController.signal);
             setCard(response);
             setFront(response.front);
             setBack(response.back);
         } catch (error) {
           if (error.name === "AbortError") {
             console.log("aborted");
           } else {
             throw error;
           }
         }
       }
       loadCard();
       return () => abortController.abort();
     }, [cardId]);
    
      const handleSubmit = (event) => {
        event.preventDefault();
          updateCard({ ...card, front: front, back: back }).then(() => navigate(`/decks/${deckId}`));
 
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
        <li className="breadcrumb-item active">{`Edit Card ${cardId}`}</li>
      </ol>
      <h3>Edit Card</h3>
      <CardForm
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        deck={deck}
        handleSubmit={handleSubmit}
        edit={true}
      />
    </div>
  );
}

export default EditCard;

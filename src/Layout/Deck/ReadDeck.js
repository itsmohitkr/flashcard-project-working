import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import ListCard from "../Card/ListCard";

function ReadDeck() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckAndCards() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCards(response.cards);
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

  // this function must be async function
  async function handleDeckDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete this deck? You will be unable to recover it."
    );
    if (confirm) {
      await deleteDeck(deckId);
      navigate("/");
      window.location.reload();
    }
  }
  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">{deck.name}</li>
      </ol>

      <div className="card">
        <div className="card-body">
          <div>
            <h5 className="card-title">{deck.name} </h5>
          </div>
          <p className="card-text">{deck.description}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/decks/${deck.id}/edit`)}
          >
            Edit
          </button>
          <button type="button" className="btn btn-primary mx-2" onClick={()=>navigate(`/decks/${deckId}/study`)}>
            Study
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/decks/${deckId}/cards/new`)}
          >
            + Add Cards
          </button>
          <small className="float-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeckDelete}
            >
              Delete
            </button>
          </small>
        </div>
      </div>
      <h5 className="m-3 p-2">Cards</h5>
      <ListCard cards={cards} />
    </div>
  );
}

export default ReadDeck;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LessCard from "./LessCard";
import { readDeck } from "../../utils/api";

function Study() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);
  const [currentcount, setCurrentcount] = useState(1);
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeckAndCards() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        if (response.cards && Array.isArray(response.cards)) {
          // if you won't use the if block, you might get error.
          setCards(response.cards);
          setCount(response.cards.length);
        }
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

  function nextHandler() {
    if (currentcount < count) {
      setCurrentcount((currentcount) => currentcount + 1);
      setFlip(!flip);
    } else {
      const confirm = window.confirm(
        "Restart cards? or click 'cancel' ro return to home page."
      );
      if (confirm) {
        setCurrentcount(1);
        setFlip(!flip);
        navigate(`/decks/${deck.id}/study`);
      } else {
        navigate(`/decks/${deck.id}`);
      }
    }
  }

  if (count >= 3) {
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study Card</li>
        </ol>
        <h3>{deck.name}: Study</h3>

        <div className="card">
          <div className="card-header">
            Card {currentcount} of {count}
          </div>
          {flip === false ? (
            <div className="card-body">
              <p className="card-text">{cards[currentcount - 1].front}</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFlip(!flip)}
              >
                Flip
              </button>
            </div>
          ) : (
            <div className="card-body">
              <p className="card-text">{cards[currentcount - 1].back}</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFlip(!flip)}
              >
                Flip
              </button>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={() => nextHandler()}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <LessCard count={count} deck={deck} />
      </div>
    );
  }
}

export default Study;

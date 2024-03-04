import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setName(response.name);
        setDescription(response.description);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleNameChange = ({ target }) => setName(target.value);

  const handleDescriptionChange = ({ target }) => setDescription(target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck({ ...deck, name: name, description: description }).then(() => {
      navigate(`/decks/${deckId}`);
    });
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
        <li className="breadcrumb-item active">Edit Deck</li>
      </ol>
      <h3>Edit Deck</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Brief description of the deck"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => {
            navigate(`/decks/${deckId}`);
          }}
        >
          Cancle
        </button>
        <button type="submit" className="btn btn-primary mx-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;

import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckList({ decks }) {
  const navigate = useNavigate();
  
  const deleteHandler = (deckId) => {
    console.log(deckId);
    const confirm = window.confirm(
      "Are you sure you want to delete this deck? You will be unable to recover it."
    );
    if (confirm) {
      deleteDeck(deckId)
        .then(() => {
          navigate("/");
        })
        .then(window.location.reload());
    }
  };

  const deckList = decks.map((deck) => {
    return (
      <div className="card mt-2" key={deck.id}>
        <div className="card-body">
          <div>
            <h5 className="card-title">
              {deck.name}{" "}
              <small className="float-right">{deck.cards.length} cards</small>
            </h5>
          </div>
          <p className="card-text">{deck.description}</p>
          <button type="button" className="btn btn-secondary" onClick={()=>{navigate(`/decks/${deck.id}`)}}>
            View
          </button>
          <button type="button" className="btn btn-primary mx-2" onClick={() => { navigate(`/decks/${deck.id}/study`) }}>
            Study
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteHandler(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return <div>{deckList}</div>;
}

export default DeckList;

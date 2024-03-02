import { useNavigate } from "react-router-dom";

function CardForm({ front, back, setFront, setBack, deck, handleSubmit }) {
  const navigate = useNavigate();
  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };
  const handleBackChange = (event) => {
    setBack(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          type="text"
          className="form-control"
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={handleFrontChange}
          value={front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          type="text"
          className="form-control"
          id="back"
          name="back"
          placeholder="Back side of card"
          onChange={handleBackChange}
          value={back}
        />
      </div>
      <button
        type="submit"
        className="btn btn-secondary"
        onClick={() => {
          navigate(`/decks/${deck.id}`);
        }}
      >
        Done
      </button>
      <button type="submit" className="btn btn-primary m-2">
        Save
      </button>
    </form>
  );
}

export default CardForm;

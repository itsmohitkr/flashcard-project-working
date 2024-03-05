import { Link,useNavigate} from "react-router-dom";

function LessCard({ count, deck }) {
  const navigate = useNavigate();
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
      <h4>Not enough cards.</h4>
      <p>
        You need at least 3 cards to study. There are {count} cards in this
        deck.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate(`/decks/${deck.id}/cards/new`)}
      >
        + Add Cards
      </button>
    </div>
  );
}

export default LessCard;

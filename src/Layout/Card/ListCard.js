import { deleteCard } from "../../utils/api";

function ListCard({ cards }) {
  // Check if cards is undefined, and render a message if it is
  const deleteHandler = (cardId) => {
    const confirmToDeleteCard = window.confirm(
      "Are you sure you want to delete this Card? You will be unable to recover it."
    );

    if (confirmToDeleteCard) {
      deleteCard(cardId).then(window.location.reload());
    }
  };

  if (cards) {
    const allCard = cards.map((card) => {
      return (
        <div className="container mt-2" key={card.id}>
          <div className="row bg-light pt-3 pb-3">
            <div className="col-4">
              <p>{card.front}</p>
            </div>
            <div className="col-4 ">
              <p>{card.back}</p>
            </div>
            <div className="col-4">
              <small className="float-right m-2">
                <button type="button" className="btn btn-secondary mx-2 ">
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteHandler(card.id)}
                >
                  Delete
                </button>
              </small>
            </div>
          </div>
        </div>
      );
    });
    return <div>{allCard}</div>;
  } else {
    return "Loading Card...";
  }
}

export default ListCard;

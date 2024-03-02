import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks} from "../../utils/api/index";

function Home() {

    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDecks() {
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error){
                if (error.name === "AbortError") {
                    console.log("Aborted");
                }
                else {
                    throw error;
                }
            }
        }
        loadDecks();
        return () => abortController.abort();
    },[])

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={()=>navigate("/decks/new")}>+ Create Deck</button>
          
      <DeckList decks={decks} />
    </div>
  );
}

export default Home;

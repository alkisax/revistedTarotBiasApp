import { useState, useEffect } from "react";
import axios from "axios";
import CardImages from "./CardImages";
import Question from "./Question";
import Settings from "./Settings"
import Language from "./Language"

import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

const TarotHome = () => {
  const [ gptResponse, setGptResponse ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ selectedCards, setSelectedCards ] = useState([]);
  const [ drawnCards, setDrawnCards ] = useState({ first: null, second: null,third: null });
  const [ newQuestion, setNewQuestion ] = useState('')
  const [ question, setQuestion ] = useState('')
  const [ bias, setBias ] = useState('');
  const [ lang, setLang ] = useState('en')

  const tarotUrl = "http://localhost:3001/api/tarot/tarot-reading"

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTarotReading = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${tarotUrl}`, {
          userQuestion: question,
          bias: bias,
          lang: lang,
        });
  
        setDrawnCards(response.data.drawnCards);
        setSelectedCards(response.data.selectedCards);
        setGptResponse(response.data.gptResponse);
        setError(""); // Clear previous errors
      } catch (error) {
        console.error("Error fetching response:", error);
        setError("Failed to fetch Tarot reading.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTarotReading();
  }, [question, bias, lang]);

  useEffect(() => {
    if (drawnCards.length > 0) {
      // This effect will run whenever `drawnCards` is updated
      console.log("drawnCards", drawnCards);
      console.log("selectedCards", selectedCards);
    }
  }, [drawnCards, selectedCards]);

  // Function to map card indices to image paths
  const mapCardToImage = (cardIndex) => {
    return `/deck1/${cardIndex}.jpg`; // Path to the image using the card index
  };

  const parseResponse = () => {
    const cleanResponse = gptResponse.replace(/<\/?pre>/g, ""); // Remove <pre> and </pre> tags
    return cleanResponse.split("\n").map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  const reschafle = () => {
    window.location.reload();
  };

  const handleQuestionChange = (event) => {
    console.log(event.target.value)
    setNewQuestion(event.target.value)
  }

  const handleShowDeck = () => {
    navigate('/deck1')
  }

  const addquestion = (event) => {
    event.preventDefault()
    setLoading(true)
    setQuestion(newQuestion)
    setNewQuestion('')
  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark text-white">

      <div className="container d-flex flex-column justify-content-center align-items-center py-4">

        <div>
            <Language lang={lang} setLang={setLang} />
        </div>


        <div className="d-flex justify-content-center row">
          <div className="text-center mb-4 col-4 d-flex align-items-stretch">
            <Link to="/deck1">
              <button onClick={handleShowDeck} className="btn btn-light">Show Deck</button>
            </Link>
          </div>
          <div className="col-1"></div>
          <div className="text-center mb-4 col-4 d-flex align-items-stretch">
            <button onClick={reschafle} className="btn btn-light ml-3">Reshuffle</button>
          </div>
        </div>

        <div className="viewDeck {}" id="viewDeck" >
        </div>

        <div className="viewQuestion" id="viewQuestion" >
          <Question newQuestion={newQuestion} handleQuestionChange={handleQuestionChange} addquestion={addquestion} />
    
        <div>
          <h1 className="mb-4">Tarot Reading</h1>
          {loading ? (
            <p>Loading...</p> // Display loading message only while waiting for response
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p> // Display error message
          ) : question ? ( 
            // Only show results if a question has been submitted
            <div>
              <CardImages drawnCards={drawnCards} mapCardToImage={mapCardToImage} />
              <div>{parseResponse()}</div>
            </div>
          ) : (
            <br />
          )} {/* Show nothing if no question has been submitted */}
        </div>

        </div>

        <div>
          <Settings setBias={setBias} />

          {bias && (
            <p>Selected Bias: {bias}</p>
          )}

        </div>

      </div>
    </div>
  );
}

export default TarotHome
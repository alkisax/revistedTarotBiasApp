/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import CardImages from "./CardImagesTemp";
import axios from "axios";
import Question from "./Question";
import Settings from "./Settings"
import Language from "./Language"

import banner from '../assets/banner.png';

import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

const TarotHome = () => {
  const [ gptResponse, setGptResponse ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ selectedCards, setSelectedCards ] = useState([]);
  const [ drawnCards, setDrawnCards ] = useState([]);
  const [ newQuestion, setNewQuestion ] = useState('')
  const [ question, setQuestion ] = useState('')
  const [ bias, setBias ] = useState('');
  const [ lang, setLang ] = useState('en')

  // const tarotUrl = "http://localhost:3001/api/tarot/tarot-reading"
  const tarotUrl = "https://revistedtarotbiasapp.onrender.com/api/tarot/tarot-reading"

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTarotReading = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${tarotUrl}`, {
          userQuestion: question,
          bias: bias,
          lang: lang,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setDrawnCards(response.data.drawnCards);
        setSelectedCards(response.data.selectedCards);
        console.log("from initial useffect selected cards", selectedCards);
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
  // const mapCardToImage = (cardIndex) => {
  //   return `/deck1/${cardIndex}.jpg`; // Path to the image using the card index
  // };
  const mapCardToImage = (cardName) => {
    const cardNameToIndex = {
      "The Fool": 0,
      "The Magician": 1,
      "The High Priestess": 2,
      "The Empress": 3,
      "The Emperor": 4,
      "The Hierophant": 5,
      "The Lovers": 6,
      "The Chariot": 7,
      "Strength": 8,
      "The Hermit": 9,
      "Wheel of Fortune": 10,
      "Justice": 11,
      "The Hanged Man": 12,
      "Death": 13,
      "Temperance": 14,
      "The Devil": 15,
      "The Tower": 16,
      "The Star": 17,
      "The Moon": 18,
      "The Sun": 19,
      "Judgement": 20,
      "The World": 21,
      "Ace of Cups": 22,
      "Two of Cups": 23,
      "Three of Cups": 24,
      "Four of Cups": 25,
      "Five of Cups": 26,
      "Six of Cups": 27,
      "Seven of Cups": 28,
      "Eight of Cups": 29,
      "Nine of Cups": 30,
      "Ten of Cups": 31,
      "Page of Cups": 32,
      "Knight of Cups": 33,
      "Queen of Cups": 34,
      "King of Cups": 35,
      "Ace of Pentacles": 36,
      "Two of Pentacles": 37,
      "Three of Pentacles": 38,
      "Four of Pentacles": 39,
      "Five of Pentacles": 40,
      "Six of Pentacles": 41,
      "Seven of Pentacles": 42,
      "Eight of Pentacles": 43,
      "Nine of Pentacles": 44,
      "Ten of Pentacles": 45,
      "Page of Pentacles": 46,
      "Knight of Pentacles": 47,
      "Queen of Pentacles": 48,
      "King of Pentacles": 49,
      "Ace of Swords": 50,
      "Two of Swords": 51,
      "Three of Swords": 52,
      "Four of Swords": 53,
      "Five of Swords": 54,
      "Six of Swords": 55,
      "Seven of Swords": 56,
      "Eight of Swords": 57,
      "Nine of Swords": 58,
      "Ten of Swords": 59,
      "Page of Swords": 60,
      "Knight of Swords": 61,
      "Queen of Swords": 62,
      "King of Swords": 63,
      "Ace of Wands": 64,
      "Two of Wands": 65,
      "Three of Wands": 66,
      "Four of Wands": 67,
      "Five of Wands": 68,
      "Six of Wands": 69,
      "Seven of Wands": 70,
      "Eight of Wands": 71,
      "Nine of Wands": 72,
      "Ten of Wands": 73,
      "Page of Wands": 74,
      "Knight of Wands": 75,
      "Queen of Wands": 76,
      "King of Wands": 77,
    };
  
    const index = cardNameToIndex[cardName];
    return index !== undefined
      ? `/deck1/${index}.jpg`
      : '/deck1/default.jpg'; // fallback image
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
    // console.log(event.target.value)
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
        <p>See menu for instructions</p>

        <img src={banner} alt="banner" className="img-fluid w-50" />

        <p className="w-50">“When I am furious about something, I sometimes beat the ground or a tree with my walking stick. But I certainly do not believe that the ground is to blame or that my beating can help anything... And all rites are of this kind.”
        ― Ludwig Wittgenstein, Remarks on Frazer's Golden Bough</p>

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
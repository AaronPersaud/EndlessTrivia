import axios from "axios";
import { useState } from "react";
import QuestionCard from "../QuestionCard";
import AskQuestion from "./AskQuestion";

const TriviaBot = (props) => {
  const [startGame, setStartGame] = useState(false);

  const askGPT = (data) => {
    return axios.get('http://localhost:8000/askGPT', {
      params: {question: data,
      systemConfig: "You only answer trivia questions. If the question is not a trivia question, respond with 'Enter a trivia question'"}
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <div>
      {startGame ? (
        <AskQuestion askGPT={askGPT} />
      ) : (
        <div className="bg-white w-1/2 text-center">
          <p>TriviaBot</p>
          <br />
          <p>Test your wit against TriviaBot, powered by OpenAI's gpt-3.5</p>
          <br />
          <p>Or, ask it your own trivia questions. It knows EVERYTHING</p>
          <br />
          <button onClick={() => setStartGame(true)} className="bg-indigo-200">Start</button>
          <button className="bg-indigo-200">Exit</button>
        </div>
      )}
    </div>
  );
};

export default TriviaBot;

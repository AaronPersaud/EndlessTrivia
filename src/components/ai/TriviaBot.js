import axios from "axios";
import { useState } from "react";
import AskQuestion from "./AskQuestion";
import VersusBot from "./VersusBot";

const TriviaBot = (props) => {
  const [mode, setMode] = useState();

  const askGPT = (data) => {
    return axios
      .get("http://localhost:8000/askGPT", {
        params: {
          question: data,
          systemConfig:
            "You only answer trivia questions. If the question is not a trivia question, respond with 'Enter a trivia question'",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {!mode && (
        <div className="bg-white w-1/2 text-center">
          <p>TriviaBot</p>
          <br />
          <p>Test your wit against TriviaBot, powered by OpenAI's gpt-3.5</p>
          <br />
          <p>Or, ask it your own trivia questions. It knows EVERYTHING</p>
          <br />
          <button onClick={() => setMode("question")} className="bg-indigo-200">
            Start
          </button>
          <button onClick={() => setMode("battle")} className="bg-indigo-200">
            Battle
          </button>
          <button className="bg-indigo-200">Exit</button>
        </div>
      )}
      {mode === "question" && <AskQuestion askGPT={askGPT} />}
      {mode === "battle" && <VersusBot />}
    </div>
  );
};

export default TriviaBot;

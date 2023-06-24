import axios from "axios";
import { useState } from "react";
import AskQuestion from "./AskQuestion";
import VersusBot from "./VersusBot";

const TriviaBot = (props) => {
  const [mode, setMode] = useState();

  const askGPT = (data, config) => {
    return axios
      .get("http://localhost:8000/askGPT", {
        params: {
          question: data,
          systemConfig: config,
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
        <div className="flex justify-center">
        <div className="rounded-lg bg-white justify-center w-1/2 text-center">
          <p>Welcome to TriviaBot, here to fulfill all your trivia needs. Powered by OpenAI's gpt-3.5</p>
          <br />
          <p><button onClick={() => setMode("battle")} className="rounded-sm bg-indigo-200 hover:bg-indigo-400">
            Battle
          </button> against TriviaBot and see who answers the questions first!</p>
          <br />
          <p>Or, <button onClick={() => setMode("question")} className="rounded-sm bg-indigo-200 hover:bg-indigo-400">
            ask
          </button> it your own trivia questions. It knows <b>EVERYTHING*</b>
          <span className="absolute z-1 invisible hover:visible">Up until September 2021. Results may vary.</span>
          </p>
          <br />
          <button onClick={() => props.exit()} className="rounded-sm bg-indigo-200 hover:bg-indigo-400">
            Exit to main screen
          </button>
        </div>
        </div>
      )}
      {mode && <div className="flex">
        <div className="absolute right-0">
          <button className="bg-white rounded-md px-2" onClick={() => setMode(null)}>Exit</button>
        </div>
      </div>
      }
      {mode === "question" && <AskQuestion askGPT={askGPT} />}
      {mode === "battle" && (
        <VersusBot
          setMode={setMode}
          askGPT={askGPT}
          gameMode={props.gameMode}
        />
      )}
    </div>
  );
};

export default TriviaBot;

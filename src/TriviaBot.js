import { useState } from "react";
import QuestionCard from "./QuestionCard";

const TriviaBot = (props) => {
  const [startGame, setStartGame] = useState(false);

  return (
    <div>
      {startGame ? (
        <QuestionCard />
      ) : (
        <div className="bg-white w-1/2 text-center">
          <p>TriviaBot</p>
          <br />
          <p>Test your wit against TriviaBot, powered by OpenAI's gpt-3.5</p>
          <br />
          <p>Or, ask it your own trivia questions. It knows EVERYTHING</p>
          <br />
          <button className="bg-indigo-200">Start</button>
          <button className="bg-indigo-200">Exit</button>
        </div>
      )}
    </div>
  );
};

export default TriviaBot;

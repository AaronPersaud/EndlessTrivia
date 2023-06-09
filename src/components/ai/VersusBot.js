import { useState } from "react";
import QuestionCard from "../QuestionCard";

const VersusBot = (props) => {
  [playerScore, setPlayerScore] = useState(0);
  [botScore, setBotScore] = useState(0);
  [gameInProgress, setGameInProgress] = useState(false);

  const startGame = (numQuestions) => {
    if (numQuestions === 0) {
      alert("Number of questions cannot be 0");
    } else {
      setGameInProgress(true);
    }
  };

  return (
    <div>
      {!gameInProgress ? (
        <div>
          <p>Select number of questions</p>
          <button onClick={() => startGame(numQuestions)}>Start</button>
        </div>
      ) : (
        <div>
          <div>
            <p>Your Score:{playerScore}</p>
            <p>TriviaBot's Score:{botScore}</p>
          </div>
          <QuestionCard />
        </div>
      )}
    </div>
  );
};

export default VersusBot;

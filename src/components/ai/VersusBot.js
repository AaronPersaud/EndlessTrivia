import { useEffect, useState } from "react";
import QuestionCard from "../QuestionCard";
import { getQuestions } from "../../utils";

const VersusBot = (props) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState();
  const [phase, setPhase] = useState("setup")
  const config =
    "You will be given a trivia question followed by 4 answers. Select the option that best answers the question. If you don't know the answer, make an educated guess. Give the answer like so: <number>:<option>";

  async function startGame(numQuestions) {
    if (numQuestions === 0) {
      alert("Number of questions cannot be 0");
    } else {
      const q = await getQuestions(numQuestions);
      setQuestions(q);
      setCurrentQuestion(0);
      setPlayerScore(0);
      setBotScore(0);
      setPhase("play");
    }
  }
  const parseGPTGuess = (guess) => {
    guess = guess.substr(2,guess.length - 1);
    if (guess[0] === " ") {
      guess = guess.substr(1,guess.length - 1)
    }
    return guess
  }

  const declareWinner = () => {
    if (playerScore > botScore) {
      setWinnerMessage("You win!");
    } else if (botScore > playerScore) {
      setWinnerMessage("TriviaBot wins!");
    } else {
      setWinnerMessage("It's a tie!");
    }
    setPhase("gameover");
  };

  const nextQuestion = (player) => {
    console.log(player + " answered the question first!");
    if (player === "You") {
      setPlayerScore(playerScore + 1);
    }
    else {
      setBotScore(botScore + 1);
    }
    if (currentQuestion + 1 == numQuestions) {
      declareWinner();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  useEffect(() => {
    if (phase === "play") {
      quizGPT(questionBuilder(questions[currentQuestion]), config, currentQuestion + 1);
    }
  }, [questions, currentQuestion]);

  const questionBuilder = (question) => {
    let res = question.question + " ";
    const wrong = question.incorrectAnswers;
    for (let i = 0; i < wrong.length; i++) {
      res += (i + 1).toString() + " " + wrong[i] + "; ";
    }
    res += "4 " + question.correctAnswer;
    return res;
  };

  const quizGPT = (question, config, curr) => {
    props.askGPT(question, config).then((response) => {
      console.log(response.text);
      console.log(parseGPTGuess(response.text));
      const answer = parseGPTGuess(response.text);
      if (curr === currentQuestion) {
        if (answer !== questions[currentQuestion].correctAnswer) {
          quizGPT(question,config,curr)
        }
        else {
          nextQuestion("bot");
        }
      }
    });
  };

  const handleChange = (e) => {
    setNumQuestions(e.target.value);
  };

  return (
    <div>
      {phase === "setup" && 
        <div>
          <p>Select number of questions</p>
          <select value={numQuestions} onChange={handleChange}>
            <option value="0">Select</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <button onClick={() => startGame(numQuestions)}>Start</button>
        </div>
      }
      { phase === "play" &&
        <div>
          <div className="flex">
            <p>Your Score: {playerScore}</p>
            <p className="absolute right-0">TriviaBot's Score: {botScore}</p>
          </div>
          <QuestionCard
            question={questions[currentQuestion].question}
            wrongAnswer={questions[currentQuestion].incorrectAnswers}
            correctAnswer={questions[currentQuestion].correctAnswer}
            gameMode={props.gameMode}
            nextQuestion={nextQuestion}
          />
        </div>
      }
      { phase === "gameover" && 
        <div className="text-center">
          <p>Final Score</p>
          <p>
            {playerScore} - {botScore}
          </p>
          <p>{winnerMessage}</p>
          <div className="gap-8">
            <button onClick={() => setPhase("setup")} className="bg-indigo-200">Play Again</button>
            <button onClick={() => props.setMode(null)} className="bg-indigo-200">Exit</button>
          </div>
        </div>
      }
    </div>
  );
};

export default VersusBot;

import { useState, useEffect } from "react";
import { shuffle } from "../utils"; 

const QuestionCard = (props) => {
  const question = props.question;
  const wrongAnswer = props.wrongAnswer;
  const correctAnswer = props.correctAnswer;
  const [answers, setAnswers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setAnswers(shuffle([...wrongAnswer, correctAnswer]));
  }, [wrongAnswer, correctAnswer])

  const guessSinglePlayer = (e) => {
    setDisabled(true);
    const element = document.getElementById(correctAnswer);
    if (e.target.innerText === correctAnswer) {
      e.target.style.background = "#86efac"; // green 300
    } else {
      e.target.style.background = "#f87171"; // red 400
      setTimeout(() => {
        element.style.background = "#86efac";
      }, 500);
    }
    setTimeout(() => {
      e.target.style.background = "#a5f3fc"; // cyan 200
      element.style.background = "#a5f3fc"; // cyan 200
      props.guessAnswer(e.target.innerText);
      setDisabled(false);
    }, 1500);
  };

  const guessVersusBot = (e) => {
    setDisabled(true);
    const element = document.getElementById(correctAnswer);
    if (e.target.innerText === correctAnswer) {
      e.target.style.background = "#86efac"; // green 300
    } else {
      e.target.style.background = "#f87171"; // red 400
    }
    setTimeout(() => {
      e.target.style.background = "#c7d2fe"; // indigo 200
      setDisabled(false);
    }, 1000);
  }

  const handleClick = (e) => {
    switch(props.gameMode) {
      case 'singleplayer':
        guessSinglePlayer(e);
        break;
      case 'bot':
        guessVersusBot(e);
        break;
      default:
        console.log("Something went wrong!")
    }

  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex w-2/4 font-medium justify-center items-center text-center text-2xl h-32">
        {question}
      </h1>
      <div className="w-2/4 grid grid-cols-2 gap-8">
        {answers.map((answer) => (
          <button
            className="flex rounded-lg justify-center items-center shadow text-center bg-indigo-200 cursor-pointer h-24 p-9"
            key={answer}
            id={answer}
            disabled={disabled}
            onClick={handleClick}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuestionCard;

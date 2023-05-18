import { useState, useEffect } from "react";

const QuestionCard = (props) => {
  const question = props.question;
  const wrongAnswer = props.wrongAnswer;
  const correctAnswer = props.correctAnswer;
  const [answers, setAnswers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setAnswers(shuffle([...wrongAnswer, correctAnswer]));
  }, [wrongAnswer, correctAnswer])

  //Fisher-Yates shuffling algorithm (returns new array)
  function shuffle(arr) {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleClick = (e) => {
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

  return (
    <div>
      <h1 className="flex justify-center items-center text-center text-2xl h-28">
        {question}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {answers.map((answer) => (
          <button
            className="flex rounded-lg justify-center items-center shadow text-center bg-cyan-200 cursor-pointer h-24 p-9"
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

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
      e.target.style.background = "green";
    } else {
      e.target.style.background = "red";
      setTimeout(() => {
        element.style.background = "green";
      }, 500);
    }
    setTimeout(() => {
      e.target.style.background = "#6366f1"
      element.style.background = "#6366f1";
      props.guessAnswer(e.target.innerText);
      setDisabled(false);
    }, 1500);
  };

  // const hoverAnswer = (e) => {
  //   e.target.style.background = "blue";
  // };

  // const leaveAnswer = (e) => {
  //   e.target.style.background = "none";
  // };

  return (
    <div>
      <h1 className="text-center text-2xl p-9 h-28">{question}</h1> 
      <div className="grid grid-cols-2 gap-8">
        {answers.map((answer) => (
          <button className="shadow text-center bg-indigo-500 cursor-pointer h-24 p-9"
            id={answer}
            disabled={disabled}
            // onMouseLeave={leaveAnswer}
            // onMouseEnter={hoverAnswer}
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

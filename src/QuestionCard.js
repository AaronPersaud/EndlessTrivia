const QuestionCard = (props) => {
  const question = props.question;
  const wrongAnswer = props.wrongAnswer;
  const correctAnswer = props.correctAnswer;
  const answers = shuffle([...wrongAnswer, correctAnswer]);

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
      element.style.background = "none";
      props.guessAnswer(e.target.innerText);
    }, 1500);
  };

  const hoverAnswer = (e) => {
    e.target.style.background = "blue";
  };

  const leaveAnswer = (e) => {
    e.target.style.background = "none";
  };

  return (
    <div>
      <h1 className="text-center h-28">{question}</h1> {/* height: "100px" }} */}
      <div className="grid grid-cols-2 gap-6">
        {answers.map((answer) => (
          <div className="shadow text-center cursor-pointer"
            id={answer}
            onMouseLeave={leaveAnswer}
            onMouseEnter={hoverAnswer}
            onClick={handleClick}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuestionCard;

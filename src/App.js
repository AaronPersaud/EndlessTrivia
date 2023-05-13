import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const post = questions[currentQuestion];

  useEffect(() => getQuestions(), []);

  const getQuestions = () => {
   fetch("https://the-trivia-api.com/api/questions?limit=10")
   .then((response) => response.json())
   .then((data) => {
     setQuestions(data);
     setCurrentQuestion(0);
   })
   .catch((err) => {
     console.log(err.message);
   });
  }

  const guessAnswer = (guess) => {
   if (currentQuestion === questions.length - 1) {
      getQuestions();
   }
   if (guess === post.correctAnswer) {
      setScore(score + 1);
   }
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="app">
      <div>Score: {score}</div>
      {post?
          <QuestionCard 
            question={post.question}
            wrongAnswer={post.incorrectAnswers}
            correctAnswer={post.correctAnswer}
            guessAnswer={guessAnswer}
          />:
          <p>Loading...</p>
        }
    </div>
  );
}

export default App;
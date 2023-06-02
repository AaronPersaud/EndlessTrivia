import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Modal from "./Modal";
import Rooms from "./Rooms";
import { getQuestions } from "./utils";

export function EndlessTrivia({ ctx, G, moves }) {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(true);
  const multiplayerQuestions = G.multiQuestions;

  const post = questions[currentQuestion];

  useEffect(() => {
    getQuestions().then((questions) => setQuestions(questions));
  }, []);

  const guessAnswer = (guess) => {
    if (currentQuestion === questions.length - 1) {
      getQuestions().then((questions) => {
        setQuestions(questions);
        setCurrentQuestion(0);
      });
    }
    if (guess === post.correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const goToRoom = () => {
    setGameInProgress(false);
  };

  const Multiplayer = () => {
    const element = document.getElementById("modal");
    element.style.display = "block";
  };

  return (
    <div className="app bg-slate-200 min-h-screen">
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      {gameInProgress && (
        <div>
          <Modal moves={moves} change={goToRoom} />
          <div className="flex">
            <div>Score: {score}</div>
            <button
              onClick={Multiplayer}
              className="bg-white absolute right-0 rounded-md"
            >
              Multiplayer
            </button>
          </div>
          {post ? (
            <QuestionCard
              question={post.question}
              wrongAnswer={post.incorrectAnswers}
              correctAnswer={post.correctAnswer}
              guessAnswer={guessAnswer}
            />
          ) : (
            <p className="flex justify-center text-3xl h-96 items-center">
              Loading questions...
            </p>
          )}
        </div>
      )}
      {!gameInProgress && <Rooms moves={moves} game={G} />}
      <footer className="fixed bg-slate-200 bottom-0 left-0 text-xs">
        <a href={"https://the-trivia-api.com/"}>The Trivia API</a>
      </footer>
    </div>
  );
}

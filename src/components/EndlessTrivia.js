import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Modal from "./multiplayer/Modal";
import Rooms from "./multiplayer/Rooms";
import { getQuestions } from "../utils";
import TriviaBot from "./ai/TriviaBot";

export function EndlessTrivia({ ctx, G, moves }) {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameMode, setGameMode] = useState('singleplayer');
  const multiplayerQuestions = G.multiQuestions;

  const post = questions[currentQuestion];

  useEffect(() => {
    getQuestions(5).then((questions) => setQuestions(questions));
  }, []);

  const guessAnswer = (guess) => {
    if (currentQuestion === questions.length - 1) {
      getQuestions(10).then((questions) => {
        setQuestions(questions);
        setCurrentQuestion(0);
      });
    }
    if (guess === post.correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const Multiplayer = () => {
    const element = document.getElementById("modal");
    element.style.display = "block";
  };

  return (
    <div className="app bg-slate-200 min-h-screen">
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      {gameMode === "singleplayer" && (
        <div>
          <Modal moves={moves} change={() => setGameMode('multiplayer')} />
          <div className="flex">
            <div>Score: {score}</div>
            <div className="absolute right-0">
            <button
              onClick={Multiplayer}
              className="bg-white rounded-md"
            >
              Multiplayer
            </button>
            <button onClick={() => setGameMode('bot')} className="bg-white rounded-md">
              vs. AI
            </button>
            </div>
          </div>
          {post ? (
            <QuestionCard
              question={post.question}
              wrongAnswer={post.incorrectAnswers}
              correctAnswer={post.correctAnswer}
              guessAnswer={guessAnswer}
              gameMode={gameMode}
            />
          ) : (
            <p className="flex justify-center text-3xl h-96 items-center">
              Loading questions...
            </p>
          )}
        </div>
      )}
      {gameMode === 'multiplayer' && <Rooms moves={moves} game={G} />}
      {gameMode === 'bot' && <TriviaBot exit={() => setGameMode('singleplayer')} gameMode={gameMode}/>}
      <footer className="fixed bg-slate-200 bottom-0 left-0 text-xs">
        <a href={"https://the-trivia-api.com/"}>The Trivia API</a>
      </footer>
    </div>
  );
}

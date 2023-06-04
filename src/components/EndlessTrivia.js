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
  const [singlePlayer, setSinglePlayer] = useState(true);
  const [bot, setBot] = useState(false);
  const [rooms, setRooms] = useState(false);
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
    setSinglePlayer(false);
    setRooms(true);
  };

  const Multiplayer = () => {
    const element = document.getElementById("modal");
    element.style.display = "block";
  };

  const startBot = () => {
    setSinglePlayer(false);
    setBot(true);
  }

  return (
    <div className="app bg-slate-200 min-h-screen">
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      {singlePlayer && (
        <div>
          <Modal moves={moves} change={goToRoom} />
          <div className="flex">
            <div>
            <div>Score: {score}</div>
            </div>
            <div className="absolute right-0">
            <button
              onClick={Multiplayer}
              className="bg-white rounded-md"
            >
              Multiplayer
            </button>
            <button onClick={startBot} className="bg-white rounded-md">
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
            />
          ) : (
            <p className="flex justify-center text-3xl h-96 items-center">
              Loading questions...
            </p>
          )}
        </div>
      )}
      {rooms && <Rooms moves={moves} game={G} />}
      {bot && <TriviaBot/>}
      <footer className="fixed bg-slate-200 bottom-0 left-0 text-xs">
        <a href={"https://the-trivia-api.com/"}>The Trivia API</a>
      </footer>
    </div>
  );
}

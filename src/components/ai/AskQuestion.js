import { useState } from "react";

const AskQuestion = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState();
  const config = "You only answer trivia questions. If the question is not a trivia question, respond with 'Enter a trivia question'";

  const handleSubmit = (e) => {
    if (inputValue === "") {
      alert("Cannot be blank");
    } else {
      setAnswer("Loading answer...")
      props.askGPT(inputValue, config).then((response) => {
        setAnswer(response.text)
    });
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl">TriviaBot</h1>
        <br/>
      <h5>Ask me a trivia question:</h5>
      <div>
        <input
          className="rounded-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="bg-indigo-200 rounded-sm" onClick={handleSubmit}>
          Submit
        </button>
        {answer && <div>{answer}</div>}
      </div>
    </div>
  );
};

export default AskQuestion;

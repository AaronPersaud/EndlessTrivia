import { useState } from "react";

const AskQuestion = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState("");
  const config = "You only answer trivia questions. If the question is not a trivia question, respond with 'Enter a trivia question'";

  const handleSubmit = () => {
    if (inputValue === "") {
      alert("Cannot be blank");
    } else {
      setQuestion(inputValue);
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
      <div className="justify-center">
        <input
          type="text"
          placeholder="Enter a trivia question..."
          className="rounded-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              handleSubmit();
            } 
          }}
        />
        <button className="rounded-sm bg-indigo-200 hover:bg-indigo-400" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <br/>
        <div><p><b>Q: {question}</b></p></div>
        {answer && <div>A: {answer}</div>}
    </div>
  );
};

export default AskQuestion;

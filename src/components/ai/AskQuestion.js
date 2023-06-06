import { useState } from "react";

const AskQuestion = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState();

  const handleSubmit = (e) => {
    if (inputValue === "") {
        alert("Cannot be blank");
    } 
    else {
        //make api request
        setInputValue('');
    }
  }

  return (
    <div>
      <h1>Ask a trivia question:</h1>
      <input className="rounded-sm" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button className="bg-indigo-200 rounded-sm" onClick={handleSubmit}>Submit</button>
      {answer && <div>{answer}</div>}
    </div>
  );
};

export default AskQuestion;

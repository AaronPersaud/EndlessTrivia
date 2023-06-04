import { useState } from "react";

const Modal = (props) => {
  const [inputValue, setInputValue] = useState("");

  const closeModal = () => {
    const element = document.getElementById("modal");
    element.style.display = "none";
  };

  const handleSubmit = (e) => {
    if (inputValue === "") {
      alert("Cannot be blank");
    } else {
      props.moves.joinGame(inputValue);
      props.change();
      setInputValue("");
      closeModal();
    }
  };

  return (
    <div id="modal" className="hidden fixed left-0 top-0 bg-cyan-200 z-1">
      <p>Please enter your name:</p>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded-sm"
      />
      <div>
        <button onClick={handleSubmit} className="rounded-sm bg-indigo-200">
          Submit
        </button>
        <button
          className="rounded-sm float-right bg-indigo-200"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;

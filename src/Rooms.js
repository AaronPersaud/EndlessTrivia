const Rooms = (props) => {
  const startGame = () => {
    alert("Start the game!");
  };

  return (
    <div className="bg-white">
      <p>Players:</p>
      <div>
          {props.game.players.map((player) => (
            <div>{player}</div>
          ))}
      </div>
      <button className="rounded-sm bg-indigo-200" onClick={startGame}>Start</button>
    </div>
  );
};

export default Rooms;

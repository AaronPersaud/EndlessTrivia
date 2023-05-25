import QuestionCard from "./QuestionCard";

const PlayerCardContainer = (props) => {
  return (
    <div className="flex flex-col">
      {props.players.map((player) => {
        <QuestionCard name={player.name} />;
      })}
    </div>
  );
};

export default PlayerCardContainer;

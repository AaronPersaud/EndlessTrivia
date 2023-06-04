import PlayerCard from './PlayerCard.js'

const PlayerCardContainer = (props) => {
  return (
    <div className="flex flex-col">
      {props.players.map((player) => {
        <PlayerCard name={player.name} />;
      })}
    </div>
  );
};

export default PlayerCardContainer;

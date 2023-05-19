import { useState } from "react";

const PlayerCard = (props) => {
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");

    return (
        <div className="shadow bg-white">{name}: {score}</div>
    )
}
export default PlayerCard;
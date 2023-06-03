import { getQuestions } from "./utils";

export const Trivia = {
    setup: () => ({ players: [], multiQuestions: []}),

    moves:{
        joinGame: ({G, playerID},name) => {
            G.players.push(name);
        },
        startGame: ({G, playerID}) => {
            getQuestions().then((questions) => {
                console.log(questions)
                G.multiQuestions.push(questions);
            });
        }
    }
}
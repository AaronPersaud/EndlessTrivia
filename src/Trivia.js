export const Trivia = {
    setup: () => ({ players: []}),

    joinGame: ({G, playerID}) => {
        G.players.push(playerID);
    }
}
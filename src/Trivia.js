export const Trivia = {
    setup: () => ({ players: []}),

    moves:{
        joinGame: ({G, playerID},name) => {
            G.players.push(name);
        }
    }
}
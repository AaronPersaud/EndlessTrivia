const { Server, Origins} = require('boardgame.io/server');
const { Trivia } = require('./Trivia')

const server = Server({
    games: [Trivia],
    origins: [Origins.LOCALHOST],
});

server.run(8000);
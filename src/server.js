const { Server, Origins} = require('boardgame.io/server');

const server = Server({
    origins: [Origins.LOCALHOST],
});

server.run(8000);
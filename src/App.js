import { EndlessTrivia } from "./EndlessTrivia";
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Trivia } from "./Trivia";

// multiplayer: SocketIO({ server: 'localhost:8000' }),

const App = Client({ 

  game: Trivia,
  board: EndlessTrivia,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  debug: false

});

export default App;

import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  'X': 'player1',
  'O': 'player2',
}



function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function derivedWinner(gameBoard, players) {

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquare = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquare = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }
  return winner;
}


function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {

  // const[acitvePlayer,setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const currentPlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  const handleRestart = () => {
    setGameTurns([]);
  }


  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevGameTurns => {

      const currentTurn = derivedActivePlayer(prevGameTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns];

      return updatedTurns;
    })
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player InitialName={PLAYERS.X} symbol="X" isActive={currentPlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player InitialName={PLAYERS.O} symbol="O" isActive={currentPlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  )
}
export default App

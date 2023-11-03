import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";


const intialGameBoard = [
  [null, null, null], 
  [null, null, null],
  [null, null, null]
]



function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
      
      if(gameTurns.length > 0 && gameTurns[0].player  === 'X'){
        currentPlayer = 'O';
      }

    return currentPlayer;
}
function App() {
  let winner;
  
  // const[acitvePlayer,setActivePlayer] = useState('X');
  const[gameTurns,setGameTurns] = useState([]);

  const currentPlayer = derivedActivePlayer(gameTurns);

     
  let gameBoard = intialGameBoard;

    for(const turn of gameTurns){
        const {square , player} = turn;
        const {row , col} = square;

        gameBoard[row][col] = player;
    }

    for(const combinations of WINNING_COMBINATIONS){
      const firstSquare =  gameBoard[combinations[0].row][combinations[0].column];
      const secondSquare =  gameBoard[combinations[1].row][combinations[1].column];
      const thirdSquare =  gameBoard[combinations[2].row][combinations[2].column];

      if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
        winner = firstSquare;
        break;
      }
}



  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevGameTurns =>{

      const currentTurn = derivedActivePlayer(prevGameTurns);

      const updatedTurns = [{ square:{row : rowIndex , col : colIndex}, player :  currentPlayer},...prevGameTurns];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player InitialName="Player1" symbol="X" isActive={currentPlayer==='X'}/>
          <Player InitialName="Player2" symbol="O" isActive={currentPlayer==='O'}/>
        </ol>
        {winner && <p>You won,{winner}</p>}
        <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard}/>
      </div>
      <Log turns = {gameTurns}></Log>
    </main>
  )
}
export default App
